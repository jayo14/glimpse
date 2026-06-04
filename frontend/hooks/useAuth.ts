"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/api/auth";
import { getAccessToken, setAccessToken } from "@/lib/axios";

type GuardOptions = {
    requireAuth?: boolean;
    requireCompletedProfile?: boolean;
};

export const useAuth = ({
    requireAuth = false,
    requireCompletedProfile = false,
}: GuardOptions = {}) => {
    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

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
                const { role, full_name } = res.profile;
                const profileComplete = !!role && !!full_name?.trim();

                if (mounted) setAuthenticated(true);

                // Auth redirects logic...
                if (!requireAuth) {
                    if (pathname.includes("/auth/login") || pathname.includes("/auth/signup")) {
                        router.replace(
                            !profileComplete
                                ? "/role-selection"
                                : role === "HOST"
                                    ? "/host-dashboard"
                                    : "/guest-hub"
                        );
                    }
                } else if (requireCompletedProfile && !profileComplete) {
                    router.replace("/role-selection");
                } else if (pathname === "/role-selection" && profileComplete) {
                    router.replace(role === "HOST" ? "/host-dashboard" : "/guest-hub");
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
    }, [router, pathname, requireAuth, requireCompletedProfile]);

    return { loading, authenticated };
};