import { z } from "zod";

export const reviewInput = z.object({
  rating: z
    .number()
    .min(0, "Should be between 0 and 5")
    .max(5, "Should be between 0 and 5"),
  comment: z.string(),
  courseid: z.string(),
});

export type ReviewParams = z.infer<typeof reviewInput>;
