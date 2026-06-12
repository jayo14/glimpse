import * as EventService from "../services/event.service.js";
import {
  createEventSchema,
  signUploadSchema,
  checkGateAccessSchema,
  addCollaboratorSchema,
} from "../validators/event.validators.js";
import logger from "../utils/logger.js";

export const createEvent = async (req, res) => {
  const parsed = createEventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
  }

  try {
    const event = await EventService.createNewEvent(req.user.id, parsed.data);
    return res
      .status(201)
      .json({ message: "Event created successfully", event });
  } catch (error) {
    logger.error(`createEvent controller error: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Failed to construct event resource" });
  }
};

export const requestUpload = async (req, res) => {
  const { eventId } = req.params;
  const { filename } = req.query;
  const role_type = req.user.role || "GUEST";

  if (!filename) {
    return res
      .status(400)
      .json({ message: "Missing required filename query parameter" });
  }

  try {
    const payload = await EventService.fileUpload(req.user.id, {
      event_id: eventId,
      filename,
      role_type,
    });
    return res.status(200).json({
      uploadUrl: payload.upload_url,
      storagePath: payload.storage_path,
    });
  } catch (error) {
    logger.error(`requestUploadSignature error: ${error.message}`);
    if (
      error.message.includes("inactive") ||
      error.message.includes("registered") ||
      error.message.includes("exhausted")
    ) {
      return res.status(403).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Failed to allocate upload signature channel" });
  }
};

export const addCollaborator = async (req, res) => {
  const { eventId } = req.params;
  const parsed = addCollaboratorSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
  }

  try {
    const collaborator = await EventService.inviteCollaborator(
      eventId,
      parsed.data.email,
    );
    return res
      .status(200)
      .json({ message: "Collaborator added successfully", collaborator });
  } catch (error) {
    logger.error(`addCollaborator controller error: ${error.message}`);
    return res
      .status(500)
      .json({
        message: error.message || "Failed to add collaborator to event",
      });
  }
};

export const checkGateAccess = async (req, res) => {
  try {
    const event_id = req.body.event_id;
    const token = req.body.token;

    const currentUserId = req.user ? req.user.id : null;

    const accessData = await EventService.verifyGateAccess(currentUserId, {
      event_id,
      token,
    });

    return res.status(200).json({ message: "Access granted", ...accessData });
  } catch (error) {
    logger.error(`checkGateAccess controller error: ${error.message}`);
    return res
      .status(403)
      .json({
        message: error.message || "Access denied to this event gateway.",
      });
  }
};
