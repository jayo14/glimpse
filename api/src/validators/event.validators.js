import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title must be at least 3 characters long"),

  description: z.string().optional(),

  location: z.string().optional(),

  guest_photo_limit: z
    .number()
    .int("Guest photo limit must be an integer")
    .positive("Guest photo limit must be positive")
    .default(15),

  event_start: z.string().datetime("Invalid start date format").optional(),

  event_end: z.string().datetime("Invalid end date format").optional(),
});

export const signUploadSchema = z.object({
  event_id: z
    .string({
      required_error: "Event ID is required",
    })
    .uuid("Invalid Event ID"),

  filename: z
    .string({
      required_error: "Filename is required",
    })
    .min(1, "Filename is required"),

  role_type: z.enum(["PHOTOGRAPHER", "GUEST"], {
    errorMap: () => ({
      message: "Role must be PHOTOGRAPHER or GUEST",
    }),
  }),
});


export const addCollaboratorSchema = z.object({
  email: z
    .string({
      required_error: "Collaborator email is required",
    })
    .email("Please provide a valid email address"),
});

export const checkGateAccessSchema = z.object({
  event_code: z
    .string({
      required_error: "Event code or ID parameter is required",
    })
    .min(1, "Event identifier cannot be blank"),

  inviteToken: z
    .string()
    .optional(),
});