import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(1, "Event title is required"),

    description: z.string().optional(),
    location: z.string().optional(),

    guest_photo_limit: z.number().min(0).optional(),
    attendees: z.number().min(0).optional(),

    event_start: z.string().optional(),
    event_end: z.string().optional(),

    photographers: z.array(
        z.object({
            email: z.string().email("Please enter a valid email address."),
        })
    ),
});

export type EventFormInputs = z.infer<typeof createEventSchema> & {
    photographers?: { email: string }[];
};