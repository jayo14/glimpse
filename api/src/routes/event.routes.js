import { Router } from "express";
import {
  createEvent,
  requestUploadSignature,
} from "../controllers/event.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/events", requireAuth, createEvent);
router.post("/media/sign-upload", requireAuth, requestUploadSignature);

export default router;
