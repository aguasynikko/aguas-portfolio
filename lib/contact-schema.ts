import { z } from "zod";

/** Shared by the client form and the API route, so validation can't drift. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little too long."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .max(120, "Subject is too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a bit more — 20 characters minimum.")
    .max(4000, "Message is too long."),
  /** Honeypot: bots fill hidden fields, humans never see this one. */
  company: z.string().max(0, "Submission rejected.").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
