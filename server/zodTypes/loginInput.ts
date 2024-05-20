import { z } from "zod";

export const loginInput = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .max(50, "Email cannot be longer than 50 characters")
    .email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 8 characters long"),
});

export type LoginParams = z.infer<typeof loginInput>;
