import { z } from "zod";
import { emailInputType } from "./signupInput";

export const emailInput = z.object({
  email: emailInputType,
});

export type EmailParams = z.infer<typeof emailInput>;
