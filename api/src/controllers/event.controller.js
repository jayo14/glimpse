import * as EventService from "../services/event.service.js";
import { createEventSchema, signUploadSchema } from "../validators/event.validators.js";
import logger from "../utils/logger.js";

export const createEvent = async (req, res) => {
  const parsed = createEventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const event = await EventService.createNewEvent(req.user.id, parsed.data);
    return res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    logger.error(`createEvent controller error: ${error.message}`);
    return res.status(500).json({ message: "Failed to construct event resource" });
  }
};

export const requestUploadSignature = async (req, res) => {
  const parsed = signUploadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const payload = await EventService.fileUpload(req.user.id, parsed.data);
    return res.status(200).json(payload);
  } catch (error) {
    logger.error(`requestUploadSignature error: ${error.message}`);
    if (error.message.includes("limits") || error.message.includes("registered")) {
      return res.status(403).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to allocate upload signature channel" });
  }
};