import * as UserService from "../services/user.service.js";
import logger from "../utils/logger.js";

// update Profile
export const updateProfile = async (req, res) => {
  const { full_name, avatar_url, role } = req.body;

  // req.user is set by the auth middleware
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const profile = await UserService.updateProfile(userId, {
      full_name,
      avatar_url,
      role,
    });

    return res.status(200).json({
      success: true,
      message: `Profile updated successfully and role set to ${role}`,
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
    const { user, profile } = await UserService.getCurrentUser(accessToken);

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
