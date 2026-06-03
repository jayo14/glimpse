import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),

  password: z.string({
    required_error: "Password is required",
  }),
});

export const updateProfileSchema = z.object({
  full_name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters long"),

  role: z.enum(["HOST", "PHOTOGRAPHER", "GUEST"], {
    errorMap: () => ({
      message: "Role must be HOST, PHOTOGRAPHER or GUEST",
    }),
  }),
});

export const googleAuthSchema = z.object({
  id_token: z.string({
    required_error: "Google ID Token is required",
  }),
});

export const refreshSchema = z
  .object({
    refresh_token: z
      .string()
      .min(10, "Refresh token must be at least 10 characters")
      .optional(),
  })
  .passthrough();
