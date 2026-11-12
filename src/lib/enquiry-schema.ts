import { z } from "zod";

export const enquirySchema = z.object({
  reference: z.string().uuid(),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  contact: z
    .string()
    .trim()
    .max(255)
    .refine(
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^\+?[\d\s-]{10,15}$/.test(v),
      "Enter a valid email or phone number.",
    ),
  program: z.string().max(100),
  context: z.string().max(300),
  preferred_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
  method: z.enum(["WhatsApp", "Call", "Email"]),
  message: z.string().trim().max(2000),
  consent: z.literal(true),
});
