import { z } from "zod";

export const signupInput = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(30)
      .email("Please enter a valid email."),
    password: z.string().min(6, { message: "Minimum 6 characters." }).max(20),
  });
  
export type SignupParams = z.infer<typeof signupInput>

