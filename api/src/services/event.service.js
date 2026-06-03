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
  const qrCodeUrl = `${process.env.API_URL}/v1/events/join/${event.id}`;

  return await prisma.event.update({
    where: { id: event.id },
    data: { qrCodeUrl },
  });
};

/**
 * direct storage path validation & S3 Upload
 */
export const fileUpload = async (
  userId,
  { event_id, filename, role_type },
) => {
  const event = await prisma.event.findUnique({ where: { id: event_id } });
  if (!event || !event.isActive) {
    throw new Error("Event context is inactive or invalid");
  }

  // Validate Guest
  if (role_type === "GUEST") {
    const registration = await prisma.guestRegistration.findUnique({
      where: { eventId_guestId: { eventId: event_id, guestId: userId } },
    });

    if (!registration)
      throw new Error("Guest is not registered for this event");
    if (registration.shotsUsed >= event.guestPhotoLimit) {
      throw new Error("Target account photo structural allocations exhausted");
    }
  }

  // storage buckets
  const sanitizedName = `${Date.now()}_${filename}`;
  const bucketFolder =
    role_type === "PHOTOGRAPHER" ? "raw-studio" : "candid-lens";
  const destinationStoragePath = `${event_id}/${bucketFolder}/${sanitizedName}`;

  // upload directly Supabase Storage
  const { data, error } = await supabase.storage
    .from("event-uploads")
    .createSignedUploadUrl(destinationStoragePath);

  if (error) {
    logger.error(`Supabase Signed Storage Error: ${error.message}`);
    throw error;
  }

  // create photo for PENDING state
  await prisma.photo.create({
    data: {
      eventId: event_id,
      uploadedBy: userId,
      roleType: role_type,
      storagePath: destinationStoragePath,
      processingStatus: "PENDING",
    },
  });

  return {
    upload_url: data.signedUrl,
    storage_path: destinationStoragePath,
  };
};
