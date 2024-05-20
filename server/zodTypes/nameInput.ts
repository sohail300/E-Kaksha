import { z } from "zod";
import { nameInputType } from "./signupInput";

export const nameInput = z.object({
  name: nameInputType,
});

export type NameParams = z.infer<typeof nameInput>;
