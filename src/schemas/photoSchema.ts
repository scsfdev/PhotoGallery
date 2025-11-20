import { z } from "zod";

const CategoryObjectSchema = z.object({
  categoryGuid: z.string().uuid(),
  title: z.string().min(1),
});

const requiredString = (fieldName: string) =>
  z
    .string({ error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });

export const photoSchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  location: requiredString("Location"),
  country: requiredString("Country"),
  dateTaken: z.date({ error: "Date Taken is required" }),
  category: z.array(CategoryObjectSchema).optional(),
});

export type PhotoSchema = z.infer<typeof photoSchema>;
