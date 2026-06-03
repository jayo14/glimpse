import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import ws from "ws";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  throw new Error("Missing required Supabase environment variables");
}

const realtimeConfig = {
  realtime: {
    transport: ws,
  },
};

// Public client — uses the user's JWT for RLS-scoped queries
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    ...realtimeConfig,
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Service role client — bypasses RLS for server-side ops
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    ...realtimeConfig,
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Returns a Supabase client scoped to a specific user's JWT
export const supabaseWithAuth = (accessToken) =>
  createClient(supabaseUrl, supabaseAnonKey, {
    ...realtimeConfig,
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });