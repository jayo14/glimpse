"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import LoaderTwo from "../ui/loader-two";
import { loginSchema, LoginInput } from "@/validators/auth";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { clear } = useApiStatus();
  const { loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    clear();

    try {
      const res = await AuthService.login(data);
      toast.success(res.message || "Welcome back.");

      const { role, full_name } = res.profile;

      if (!role || !full_name?.trim()) {
        router.push("/role-selection");
        return;
      }

      router.push(role === "HOST" ? "/host" : "/guest");
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed.";
      toast.error(errorMsg);
    }
  };

  if (loading) {
    return <LoaderTwo />;
  }

  return (
    <div className="flex w-full flex-col font-body">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold ml-4">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="architect@glimpse.com"
              className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-full px-8 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all italic text-lg"
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-500 italic ml-4">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline px-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[9px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all font-bold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-full px-8 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all text-lg"
            />
            {errors.password && (
              <p className="mt-2 text-xs text-red-500 italic ml-4">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end px-4">
          <Link
            href="/auth/forgot-password"
            className="text-[9px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all font-bold"
          >
            Forgot Credentials?
          </Link>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full h-20 bg-white text-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:bg-white/90 transition-all font-bold shadow-2xl flex items-center justify-center gap-3"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Authorizing..." : "Authorize Dashboard"}
        </motion.button>
      </form>

      <div className="mt-12 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-bold">
            <span className="bg-black px-4 text-white/10 italic">Secure Node Connect</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full h-16 rounded-full border border-white/10 bg-white/[0.02] text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold flex items-center justify-center gap-4 hover:bg-white/[0.05] transition-all"
        >
          <svg className="h-4 w-4 grayscale opacity-40" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Identity Proxy
        </motion.button>
      </div>

      <div className="text-center mt-12 space-y-4">
        <p className="text-xs text-white/20 italic">
          No account?{" "}
          <Link
            href="/auth/signup"
            className="text-white font-bold not-italic hover:underline ml-1"
          >
            Create one.
          </Link>
        </p>
        <Link
          href="/guest"
          className="text-[9px] uppercase tracking-[0.3em] text-white/10 hover:text-white transition-all font-bold block"
        >
          Continue as Guest
        </Link>
      </div>
    </div>
  );
}
