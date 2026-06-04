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
      toast.success(res.message || "Logged in successfully!");

      const { role, full_name } = res.profile;

      if (!role || !full_name?.trim()) {
        router.push("/role-selection");
        return;
      }

      router.push(role === "HOST" ? "/host-dashboard" : "/guest-hub");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Trigger error toast with custom fallback
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Try again.";
      toast.error(errorMsg);
    }
  };

  if (loading) {
    return <LoaderTwo />;
  }

  return (
    <div className="flex w-full max-w-sm flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4"
      >
        {/* EMAIL */}
        <div className="relative mt-2 w-full">
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder=" "
            className="peer block w-full h-12 rounded-lg border border-border bg-input-bg px-4 sm:px-6 pb-2 pt-3 text-sm text-foreground outline-none focus:border-foreground"
          />
          <label
            htmlFor="email"
            className="absolute top-1.5 sm:top-2 left-3 sm:left-4 z-10 origin-left -translate-y-4 scale-75 transform bg-background px-2 text-[14px] sm:text-[16px] text-gray duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-foreground"
          >
            Email Address
          </label>
          {errors.email && (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative mt-2 w-full">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder=" "
            className="peer block w-full h-12 rounded-lg border border-border bg-input-bg px-4 sm:px-6 pb-2 pt-3 text-sm pr-10 sm:pr-12 text-foreground outline-none focus:border-foreground"
          />
          <label
            htmlFor="password"
            className="absolute top-1.5 sm:top-2 left-3 sm:left-4 z-10 origin-left -translate-y-4 scale-75 transform bg-background px-2 text-[14px] sm:text-[16px] text-gray duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 sm:peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-foreground"
          >
            Password
          </label>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray hover:text-foreground cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="mt-2 flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-gray hover:text-foreground hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {errors.password && (
          <p className="mt-1 text-xs sm:text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

        {/* SUBMIT */}
        <Button
          size={"lg"}
          type="submit"
          disabled={isSubmitting}
          className="rounded-full flex items-center justify-center w-full cursor-pointer h-10 sm:h-12 bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* GOOGLE BUTTON */}
      <button
        type="button"
        className="mt-4 w-full h-10 sm:h-12 shadow-none rounded-full text-sm md:text-md border border-border bg-input-bg text-foreground flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition cursor-pointer"
      >
        <svg className="mr-2 md:mr-3 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      {/* GUEST */}
      <div className="text-center mt-4">
        <Link
          href="/guest-hub"
          className="text-sm text-gray hover:text-foreground font-medium hover:underline"
        >
          Continue as Guest
        </Link>
      </div>

      {/* SIGNUP */}
      <div className="text-center mt-3">
        <p className="text-gray text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-foreground font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
