import { supabaseWithAuth } from "../utils/supabase.js";
import logger from "../utils/logger.js";

import prisma from "../utils/prisma.js";

/**
 * Get the current user's profile using their access token.
 */
export const getCurrentUser = async (accessToken) => {
  const client = supabaseWithAuth(accessToken);

  const {
    data: { user },
    error: userError,
  } = await client.auth.getUser();

  if (userError || !user) {
    logger.error(
      `getCurrentUser auth error: ${userError?.message || "User not found"}`,
    );

    throw userError || new Error("User not found");
  }

  // Fetch profile data
  const profile = await prisma.profile.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!profile) {
    logger.error("User Profile not found");
    throw new Error("User profile not found");
  }

  return { user, profile };
};

/**
 * Set or update a user's info and role after registration.
 */
export const updateProfile = async (
  userId,
  { full_name, avatar_url, role },
) => {
  try {
    const data = {
      role: role.toUpperCase(),
    };

    if (full_name !== undefined) {
      data.full_name = full_name;
    }

    if (avatar_url !== undefined) {
      data.avatar_url = avatar_url;
    }

    const profile = await prisma.profile.update({
      where: {
        id: userId,
      },
      data,
    });

    logger.info(`Profile updated for user ${userId}`);

    return profile;
  } catch (error) {
    logger.error(`updateProfile error: ${error.message}`);
    throw error;
  }
};
