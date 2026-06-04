"use client";

import { useAuth } from "@/hooks/useAuth";

export default function HostDashboard() {
  const { loading } = useAuth({
    requireAuth: true,
    requireCompletedProfile: true,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Host Dashboard</div>;
}