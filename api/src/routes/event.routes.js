import { Router } from "express";
import {
  createEvent,
  requestUpload,
  addCollaborator,
  checkGateAccess
} from "../controllers/event.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", requireAuth, createEvent);
router.post("/:eventId/media-upload", requireAuth, requestUpload);
router.post("/:eventId/collaborators", requireAuth, addCollaborator);
router.post("/verify-access", requireAuth, checkGateAccess);

export default router;
