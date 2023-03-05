import { z } from "zod";

const createCategorieSchema = z.object({
  name: z.string().max(45),
});

export { createCategorieSchema };
