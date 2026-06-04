import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/validators/auth";
import { AuthService } from "@/api/auth";
import { useApiStatus } from "@/hooks/useApiStatus";

export default function LoginPage() {
  const router = useRouter();
  const { error, success, setError, setSuccess, clear } = useApiStatus();

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

      setSuccess(res.message);
      
      const { role, full_name } = res.profile;

      if (!role || !full_name?.trim()) {
        router.push("/role-selection");
        return;
      }

      router.push(role === "HOST" ? "/host-dashboard" : "/guest-hub");
    } catch (err) {
      setError(err, "Login failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {success && <div className="text-green-500 text-sm">{success}</div>}
      <div>
        <label>Email</label>
        <input
          {...register("email")}
          type="email"
          className="border p-2 w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <input
          {...register("password")}
          type="password"
          className="border p-2 w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white p-2 w-full"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
