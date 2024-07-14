import { z } from "zod";

export const loginInput = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Please enter a valid email."),
  password: z.string(),
});

export type LoginParams = z.infer<typeof loginInput>;
