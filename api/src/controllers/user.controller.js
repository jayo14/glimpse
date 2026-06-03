import * as UserService from "../services/user.service.js";
import { updateProfileSchema } from "../validators/auth.validators.js";
import logger from "../utils/logger.js";

// update Profile
export const updateProfile = async (req, res) => {
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  // req.user is set by the auth middleware
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const profile = await AuthService.updateProfile(userId, parsed.data.role);

    return res.status(200).json({
      success: true,
      message: `Role set to ${parsed.data.role}`,
      profile,
    });
  } catch (error) {
    logger.error(`updateProfile controller error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Failed to set role" });
  }
};

// get user
export const getMe = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const { user, profile } = await AuthService.getCurrentUser(accessToken);

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
      profile,
    });
  } catch (error) {
    if (error.message?.includes("JWT")) {
      return res
        .status(401)
        .json({ success: false, message: "Token expired or invalid" });
    }
    logger.error(`getMe controller error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Failed to get user" });
  }
};
