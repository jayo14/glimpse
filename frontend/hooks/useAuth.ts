/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/api/auth";
import { getAccessToken, setAccessToken } from "@/lib/axios";

type GuardOptions = {
  requireAuth?: boolean;
  requireCompletedProfile?: boolean;
  allowedRoles?: ("HOST" | "GUEST" | "PHOTOGRAPHER")[];
};

export const useAuth = ({
  requireAuth = false,
  requireCompletedProfile = false,
  allowedRoles = [],
}: GuardOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          if (requireAuth) router.replace("/auth/login");
          if (mounted) {
            setAuthenticated(false);
            setLoading(false);
          }
          return;
        }

        const res = await AuthService.getMe();
        const { role, full_name } = res.profile || {};
        const profileComplete = !!role && !!full_name?.trim();

        if (mounted) {
          setAuthenticated(true);
          setUserProfile(res.profile);
        }

        if (!requireAuth) {
          if (pathname.includes("/auth/login") || pathname.includes("/auth/signup")) {
            router.replace(
              !profileComplete
                ? "/role-selection"
                : role === "HOST"
                ? "/host"
                : "/guest"
            );
          }
        } 
        else if (requireCompletedProfile && !profileComplete) {
          router.replace("/role-selection");
          return;
        } 
        else if (pathname === "/role-selection" && profileComplete) {
          router.replace(role === "HOST" ? "/host" : "/guest");
          return;
        }

        if (profileComplete && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
          console.warn(`Access Denied: Role "${role}" is not authorized for this view.`);
          router.replace(role === "HOST" ? "/host" : "/guest");
          return;
        }

        if (mounted) setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setAccessToken(null);
        if (requireAuth) router.replace("/auth/login");
        if (mounted) {
          setAuthenticated(false);
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [router, pathname, requireAuth, requireCompletedProfile, allowedRoles]);

  return { loading, authenticated, user: userProfile };
};