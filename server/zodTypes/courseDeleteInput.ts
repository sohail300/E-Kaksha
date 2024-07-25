import { z } from "zod";

export const deleteInput = z.object({
  courseId: z.string({
    description: "Provide a valid input",
  }),
});

export type deleteParams = z.infer<typeof deleteInput>;
