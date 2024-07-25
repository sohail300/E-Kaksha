import { z } from "zod";

const imageSchema = z.object({
  originalname: z.string(),
  mimetype: z.string().regex(/^image\/(jpeg|png|gif|bmp|webp)$/),
  size: z.number().max(5 * 1024 * 1024), // 5MB max
  buffer: z.instanceof(Buffer),
});

export const videoSchema = z.object({
  name: z.string(),
  link: z.string(),
});

export const sectionSchema = z.object({
  title: z.string(),
  resources: z.string(),
  videos: z.array(videoSchema),
});

export const courseInput = z.object({
  title: z.string({
    description: "Provide a valid input",
  }),
  description: z.string({
    description: "Provide a valid input",
  }),
  price: z.string().regex(/^[0-9]+$/, "It should be number"),
  image: imageSchema,
  duration: z.string().regex(/^[0-9]+$/, "It should be number"),
  resource: z.string().regex(/^[0-9]+$/, "It should be number"),
  priceid: z.string({
    description: "Provide a valid input",
  }),
  sections: z.array(sectionSchema),
});

export type courseParams = z.infer<typeof courseInput>;
