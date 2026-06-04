"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";

type ProfileSetupInput = {
  full_name: string;
  role: "HOST" | "PHOTOGRAPHER" | "GUEST";
};

export default function RoleSelectionPage() {
  const router = useRouter();
  const { error, success, setError, setSuccess, clear } = useApiStatus();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSetupInput>({
    defaultValues: {
      full_name: "",
      role: "GUEST", // default fall-through option
    },
  });

  const onSubmit = async (data: ProfileSetupInput) => {
    clear();

    try {
      const res = await AuthService.updateProfile({
        full_name: data.full_name,
        role: data.role,
      });

      setSuccess("Profile updated successfully!");

      // Point the user to their designated dashboard layout conditional structure
      if (res.profile?.role === "HOST") {
        router.push("/host-dashboard");
      } else {
        router.push("/guest-hub");
      }
    } catch (err) {
      setError(err, "Failed to update profile details.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <h2 className="text-xl font-bold">Complete your Profile</h2>
        <p className="text-sm text-gray-500">Please provide your details to get started.</p>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}

      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          {...register("full_name", { required: "Full name is required" })}
          type="text"
          placeholder="John Doe"
          className="border p-2 w-full mt-1"
        />
        {errors.full_name && (
          <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Select Your Account Role</label>
        <select
          {...register("role", { required: "Please select a role" })}
          className="border p-2 w-full bg-white"
        >
          <option value="GUEST">Guest (Viewer / Attendee)</option>
          <option value="HOST">Host (Event Organizer)</option>
          <option value="PHOTOGRAPHER">Photographer</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white p-2 w-full font-medium disabled:opacity-50"
      >
        {isSubmitting ? "Saving Profile..." : "Continue to Dashboard"}
      </button>
    </form>
  );
}