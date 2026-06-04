import { Router } from "express";
import {
  register,
  login,
  logout,
  refresh,
  googleSignIn,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes (no token required)
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/google-sign-in", googleSignIn);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/forgot-password", forgotPassword);

// Protected routes (Bearer token required)
router.post("/reset-password", requireAuth, resetPassword);
router.post("/logout", requireAuth, logout);

export default router;
