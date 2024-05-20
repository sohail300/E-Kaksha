import { z } from "zod";

export const nameInputType = z
  .string()
  .min(1, "Name cannot be empty")
  .max(50, "Name cannot be longer than 50 characters")
  .regex(
    /^[a-zA-Z\s'-]+$/,
    "Name can only contain letters, spaces, apostrophes, and hyphens"
  );

export const emailInputType = z
  .string()
  .min(1, "Email cannot be empty")
  .max(50, "Email cannot be longer than 50 characters")
  .email("Please enter a valid email.");

export const passwordInputType = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(100, "Password cannot be longer than 100 characters")
  .regex(
    /([a-zA-Z])/,
    "Password must contain at least one letter (lowercase or uppercase) and at least one digit"
  )
  .regex(
    /[0-9]/,
    "Password must contain at least one letter (lowercase or uppercase) and at least one digit"
  );

export const signupInput = z.object({
  name: nameInputType,
  email: emailInputType,
  password: passwordInputType,
});

export type SignupParams = z.infer<typeof signupInput>;
