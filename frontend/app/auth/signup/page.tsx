"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/validators/auth";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";

export default function SignupPage() {
  const router = useRouter();
  const { error, success, setError, setSuccess, clear } = useApiStatus();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    clear();

    try {
      const res = await AuthService.signup(data);
      setSuccess(res.message || "Registration successful!");

      // check email verification
      if (res.email_confirmation_required) {
        router.push("/auth/verify-request");
        return;
      }

      // Otherwise, log them straight in and send them to the profile onboarding setup
      router.push("/role-selection");
    } catch (err) {
      setError(err, "Signup failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto p-4"
    >
      <h2 className="text-xl font-bold">Create an Account</h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          className="border p-2 w-full mt-1"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          {...register("password")}
          type="password"
          className="border p-2 w-full mt-1"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white p-2 w-full font-medium disabled:opacity-50"
      >
        {isSubmitting ? "Registering..." : "Sign Up"}
      </button>
    </form>
  );
}
