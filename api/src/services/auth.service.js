import {
  supabase,
  supabaseAdmin,
  supabaseWithAuth,
} from "../utils/supabase.js";
import logger from "../utils/logger.js";

import prisma from "../utils/prisma.js";
import { sendVerificationEmail } from "./mail.service.js";

/**
 * Handle Google Native Sign-In / Web Sign-In OAuth Tokens via Supabase Auth
 */
export const syncGoogleAuthUser = async (idToken) => {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });

  if (error) {
    logger.error(`Google Authentication Error: ${error.message}`);
    throw error;
  }

  const { user, session } = data;

  // Upsert Profile base tracking data
  let profile = await prisma.profile.findUnique({ where: { id: user.id } });

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        id: user.id,
        full_name: user.user_metadata.full_name || "Google User",
        avatar_url: user.user_metadata.avatar_url || null,
      },
    });
    logger.info(`New Profile provisioned via Google OAuth: ${user.email}`);
  }

  return { user, profile, session };
};

export const registerUser = async ({ email, password }) => {
  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
    });

  if (authError) {
    if (authError.message.includes("already")) {
      throw new Error("User already registered");
    }
    throw authError;
  }

  const user = authData.user;

  try {
    let profile = await prisma.profile.findUnique({
      where: { id: user.id },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: { id: user.id },
      });
    }

    const { data: linkData, error: linkError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "signup",
        email,
        password,
        options: {
          redirectTo: `${process.env.FRONTEND_URL}/verify-email`,
        },
      });

    if (linkError) throw linkError;

    await sendVerificationEmail({
      email,
      verificationLink: linkData.properties.action_link,
    });

    return { user, profile };
  } catch (error) {
    await supabaseAdmin.auth.admin.deleteUser(user.id);
    throw error;
  }
};

// verify email
export const verifyEmail = async ({ accessToken }) => {
  if (!accessToken) {
    throw new Error("Missing access token");
  }

  const client = supabaseWithAuth(accessToken);

  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) {
    logger.error(`verifyEmail error: ${error?.message}`);
    throw new Error("Invalid or expired session");
  }

  if (!user.email_confirmed_at) {
    logger.error("Email not confirmed yet");
    throw new Error("Email not confirmed");
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  logger.info(`Email verified: ${user.email}`);

  const { data: sessionData } = await client.auth.getSession();

  return {
    user,
    profile,
    session: sessionData.session,
  };
};

/**
 * Sign in with email + password via Supabase Auth.
 * Returns the full session (access_token, refresh_token) plus the profile.
 */
export const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    logger.error(`loginUser error: ${error.message}`);
    throw error;
  }

  // Fetch the user's profile (role, full_name, avatar)
  const profile = await prisma.profile.findUnique({
    where: {
      id: data.user.id,
    },
  });
  if (!profile) {
    logger.error("Profile not found");
    throw new Error("Profile not found");
  }

  logger.info(`User logged in: ${email}`);
  return { session: data.session, user: data.user, profile };
};

/**
 * Sign out the current user.
 */
export const logoutUser = async (accessToken) => {
  const client = supabaseWithAuth(accessToken);
  const { error } = await client.auth.signOut();

  if (error) {
    logger.error(`logoutUser error: ${error.message}`);
    throw error;
  }

  logger.info("User logged out");
};


/**
 * Refresh the session using the refresh token.
 * Call this when the access_token expires (Supabase tokens expire in 1 hour by default).
 */
export const refreshSession = async (refreshToken) => {
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error) {
    logger.error(`refreshSession error: ${error.message}`);
    throw error;
  }

  return data.session;
};
