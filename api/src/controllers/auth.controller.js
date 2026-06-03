import * as AuthService from "../services/auth.service.js";
import {
  googleAuthSchema,
  registerSchema,
  loginSchema,
  updateProfileSchema,
  refreshSchema,
} from "../validators/auth.validators.js";
import logger from "../utils/logger.js";
import { sendVerificationEmail } from "../services/mail.service.js";

// google sign in
export const googleSignIn = async (req, res) => {
  const parsed = googleAuthSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const { user, profile, session } = await AuthService.syncGoogleAuthUser(
      parsed.data.id_token,
    );

    if (session?.refresh_token) {
      res.cookie("glimpse_refresh", session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OAuth Authentication Successful",
      user: { id: user.id, email: user.email },
      profile,
      access_token: session?.access_token ?? null,
    });
  } catch (error) {
    logger.error(`googleSignIn error: ${error.message}`);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired provider token" });
  }
};

// register
export const register = async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const { user, profile } = await AuthService.registerUser(parsed.data);

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please verify your email.",
      email_confirmation_required: true,
    });
  } catch (error) {
    if (error.message?.includes("already registered")) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    logger.error(`register controller error: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({
      success: false,
      message: "Missing access token",
    });
  }

  try {
    const { user, profile, session } = await AuthService.verifyEmail({
      accessToken: access_token,
    });

    // refresh token in HTTP-only cookie
    if (session?.refresh_token) {
      res.cookie("glimpse_refresh", session.refresh_token, {
        httpOnly: true, // prevents JS access
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
        sameSite: "strict", // CSRF protection
        path: "/", // available across API
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: user.id,
        email: user.email,
      },
      access_token: session?.access_token || access_token,
      email_confirmation_required: false,
    });
  } catch (error) {
    logger.error(`verifyEmail controller error: ${error.message}`);

    return res.status(400).json({
      success: false,
      message: error.message || "Invalid or expired verification link",
    });
  }
};

// login
export const login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const { session, user, profile } = await AuthService.loginUser(parsed.data);

    res.cookie("glimpse_refresh", session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
      profile,
      access_token: session.access_token,
    });
  } catch (error) {
    // Supabase returns "Invalid login credentials" for wrong email/password
    if (error.message?.includes("Invalid login credentials")) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    logger.error(`login controller error: ${error.message}`);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

// logout
export const logout = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    await AuthService.logoutUser(accessToken);

    // Clear the refresh token cookie
    res.clearCookie("glimpse_refresh");

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    logger.error(`logout controller error: ${error.message}`);
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};

// { refresh_token } OR reads from httpOnly cookie
export const refresh = async (req, res) => {
  // Prefer cookie (more secure), fall back to body (for mobile clients)
  const refreshToken = req.cookies?.glimpse_refresh || req.body?.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const session = await AuthService.refreshSession(refreshToken);

    // Rotate the cookie
    res.cookie("glimpse_refresh", session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      access_token: session.access_token,
      expires_at: session.expires_at,
    });
  } catch (error) {
    res.clearCookie("glimpse_refresh");
    logger.error(`refresh controller error: ${error.message}`);
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};
