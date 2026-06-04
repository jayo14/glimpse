"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { error, success, setError, setSuccess } = useApiStatus();

  const verificationStarted = useRef(false);

  useEffect(() => {
    // get token from the hash 
    let token = null;
    if (typeof window !== "undefined" && window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1)); // remove the '#'
      token = params.get("access_token");
    }

    if (!token) {
      token = searchParams.get("access_token");
    }

    if (!token) {
      setError(null, "Invalid or missing verification token.");
      return;
    }

    if (verificationStarted.current) return;
    verificationStarted.current = true;

    const performVerification = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await AuthService.verifyEmail(token);
        setSuccess("Email successfully verified! Redirecting to setup...");

        setTimeout(() => {
          router.push("/role-selection");
        }, 2500);
      } catch (err) {
        setError(err, "Verification failed or token expired.");
      }
    };

    performVerification();
  }, [searchParams, router, setError, setSuccess]);

  return (
    <div className="text-center p-8 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Email Verification</h2>

      {!error && !success && (
        <p className="text-gray-600">
          Verifying your email token, please wait...
        </p>
      )}

      {error && (
        <div className="space-y-2">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="text-sm underline"
          >
            Go to Login
          </button>
        </div>
      )}

      {success && <p className="text-green-600 font-medium">{success}</p>}
    </div>
  );
}
