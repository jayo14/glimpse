"use client";

import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/Icon";

interface ServerWarmupBannerProps {
  apiBaseUrl?: string;
}

export default function ServerWarmupBanner({ apiBaseUrl }: ServerWarmupBannerProps) {
  const [status, setStatus] = useState<"idle" | "warming" | "ready" | "hidden">("idle");

  useEffect(() => {
    const base =
      apiBaseUrl ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5002/api/v1";
    const healthUrl = `${base.replace(/\/api\/v1\/?$/, "")}/health`;
    let isMounted = true;

    // Show warming banner if health check takes longer than 1800ms
    const timerId = setTimeout(() => {
      if (isMounted) {
        setStatus("warming");
      }
    }, 1800);

    fetch(healthUrl, { method: "GET" })
      .then((res) => {
        if (res.ok && isMounted) {
          clearTimeout(timerId);
          setStatus("ready");
          const hideTimer = setTimeout(() => {
            if (isMounted) setStatus("hidden");
          }, 3200);
          return () => clearTimeout(hideTimer);
        }
      })
      .catch(() => {
        // Silently catch network failures
      });

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [apiBaseUrl]);

  if (status === "idle" || status === "hidden") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-2xl shadow-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all duration-300 backdrop-blur-md font-sans"
      style={{
        backgroundColor: status === "warming" ? "#09090b" : "#18181b",
        borderColor: status === "warming" ? "#27272a" : "#3f3f46",
        color: "#ffffff",
      }}
    >
      {status === "warming" ? (
        <>
          <Icon name="progress_activity" className="text-base text-zinc-300 animate-spin" />
          <span>Waking up cloud backend (Render cold start may take ~30s)...</span>
        </>
      ) : (
        <>
          <Icon name="check_circle" className="text-base text-emerald-400 fill" />
          <span>Backend active &amp; ready!</span>
        </>
      )}
    </div>
  );
}
