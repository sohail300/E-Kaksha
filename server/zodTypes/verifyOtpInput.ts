import { z } from "zod";
import { emailInputType, passwordInputType } from "./signupInput";

export const otpInputType = z.string();

export const verifyOtpInput = z.object({
  token: otpInputType,
  email: emailInputType,
  password: passwordInputType,
});

export type VerifyOtpParams = z.infer<typeof verifyOtpInput>;
