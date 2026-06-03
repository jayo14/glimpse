import { Router } from "express";
import {
  updateProfile,
  getMe
} from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/profile-update", requireAuth, updateProfile);
router.get("/me", requireAuth, getMe);

export default router;
