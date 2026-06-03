import { supabaseWithAuth } from "../utils/supabase.js";
import logger from "../utils/logger.js";

/**
 * requireAuth
 * Verifies the Bearer token from the Authorization header using Supabase.
 * Attaches req.user (from auth.users) and req.accessToken on success.
 *
 * Use on any route that requires a logged-in user.
 */
export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const client = supabaseWithAuth(accessToken);
    const { data: { user }, error } = await client.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    req.accessToken = accessToken;
    next();
  } catch (error) {
    logger.error(`requireAuth middleware error: ${error.message}`);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

/**
 * requireRole
 * Checks that the authenticated user's profile has a specific role.
 * Must be used AFTER requireAuth.
 *
 * Usage: router.post("/events", requireAuth, requireRole("host"), createEvent)
 */
export const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const { supabaseAdmin } = await import("../utils/supabase.js");

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", req.user.id)
      .single();

    if (error || !profile) {
      return res.status(403).json({ message: "Profile not found" });
    }

    if (!allowedRoles.includes(profile.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
      });
    }

    req.profile = profile;
    next();
  };
};