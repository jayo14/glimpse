import dotenv from "dotenv";
import crypto from "crypto";
import prisma from "../utils/prisma.js";
import { supabase } from "../utils/supabase.js";
import logger from "../utils/logger.js";

dotenv.config();

/**
 * Creates business events
 */
export const createNewEvent = async (hostId, eventData) => {
  const inviteToken = crypto.randomBytes(16).toString("hex");

  const event = await prisma.event.create({
    data: {
      hostId,
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
      guestPhotoLimit: eventData.guest_photo_limit,
      eventStart: eventData.event_start
        ? new Date(eventData.event_start)
        : null,
      eventEnd: eventData.event_end ? new Date(eventData.event_end) : null,
      inviteToken,
    },
  });

  // Generate public link
  const qrCodeUrl = `${process.env.FRONTEND_URL}/event/join/${event.id}?inviteToken=${inviteToken}`;

  return await prisma.event.update({
    where: { id: event.id },
    data: { qrCodeUrl },
  });
};

export const inviteCollaborator = async (eventId, email) => {
  // Find user by target email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User with this email does not exist on Glimpse.");
  }

  // Append user directly to event collaborators table
  return await prisma.collaborator.create({
    data: {
      eventId,
      userId: user.id,
      role: user.role || "PHOTOGRAPHER",
    },
  });
};

export const verifyGateAccess = async (userId, { event_id, token }) => {
  if (!event_id && !token) {
    throw new Error("Missing event identifier or invitation token parameters.");
  }

  const event = await prisma.event.findFirst({
    where: {
      OR: [
        ...(event_id ? [{ id: event_id }] : []),
        ...(token ? [{ inviteToken: token }] : []),
      ],
    },
  });

  if (!event || !event.isActive) {
    throw new Error("This event link is no longer accepting portal entries.");
  }

  if (userId) {
    const existingRegistration = await prisma.guestRegistration.findUnique({
      where: { eventId_guestId: { eventId: event.id, guestId: userId } },
    });

    if (!existingRegistration) {
      await prisma.guestRegistration.create({
        data: {
          eventId: event.id,
          guestId: userId,
          shotsUsed: 0,
        },
      });
    }
  }

  return {
    eventId: event.id,
    title: event.title,
    inviteToken: event.inviteToken,
    limit: event.guest_photo_limit,
    isAuthenticatedGuest: !!userId,
  };
};

/**
 * Handle upload requests and evaluate track limits
 */
export const fileUpload = async (userId, { event_id, filename, role_type }) => {
  const event = await prisma.event.findUnique({ where: { id: event_id } });
  if (!event || !event.isActive) {
    throw new Error("Event context is inactive or invalid");
  }

  const isCoverUpload = filename.startsWith("cover_asset_");

  // Track and evaluate photo limits for GUEST accounts
  if (role_type === "GUEST" && !isCoverUpload) {
    if (!userId) {
      throw new Error(
        "You must be authenticated to upload photos to this stream.",
      );
    }

    const registration = await prisma.guestRegistration.findUnique({
      where: { eventId_guestId: { eventId: event_id, guestId: userId } },
    });

    if (!registration) {
      throw new Error(
        "Guest profile is not registered as an attendee for this workspace.",
      );
    }

    // Dynamic evaluation check: limit of 0 means unlimited uploads allowed
    if (
      event.guestPhotoLimit > 0 &&
      registration.shotsUsed >= event.guestPhotoLimit
    ) {
      throw new Error(
        `Upload limit reached. You have exhausted your ${event.guestPhotoLimit} shots.`,
      );
    }
  }

  const sanitizedName = `${Date.now()}_${filename.replace(/\s+/g, "_")}`;
  let bucketFolder = "candid-lens";
  if (isCoverUpload) bucketFolder = "meta-branding";
  else if (role_type === "PHOTOGRAPHER") bucketFolder = "raw-studio";

  const destinationStoragePath = `${event_id}/${bucketFolder}/${sanitizedName}`;

  const { data, error } = await supabase.storage
    .from("event-uploads")
    .createSignedUploadUrl(destinationStoragePath);

  if (error) {
    logger.error(`Supabase Signed Storage Error: ${error.message}`);
    throw error;
  }

  if (isCoverUpload) {
    await prisma.event.update({
      where: { id: event_id },
      data: { coverImageUrl: destinationStoragePath },
    });
  } else {
    // Stage metadata block
    await prisma.photo.create({
      data: {
        eventId: event_id,
        uploadedBy: userId,
        roleType: role_type,
        storagePath: destinationStoragePath,
        processingStatus: "PENDING",
      },
    });

    // Automatically increment the guest's shotsUsed tracker upon successful link delivery
    if (role_type === "GUEST" && userId) {
      await prisma.guestRegistration.update({
        where: { eventId_guestId: { eventId: event_id, guestId: userId } },
        data: { shotsUsed: { increment: 1 } },
      });
    }
  }

  return {
    upload_url: data.signedUrl,
    storage_path: destinationStoragePath,
    // Provide limit tracking metrics back to client UI elements
    metrics:
      role_type === "GUEST"
        ? {
            limit: event.guestPhotoLimit,
            totalUploaded: isCoverUpload ? 0 : 1, // Adjust dynamically based on update parameters
          }
        : null,
  };
};
