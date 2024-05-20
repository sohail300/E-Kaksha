import { z } from "zod";
import { passwordInputType } from "./signupInput";

export const passwordInput = z.object({
  password: passwordInputType,
});

export type PasswordParams = z.infer<typeof passwordInput>;
