import { z } from "zod";
import { createaddressSchema } from "./address.schema";

const createRealEstateSchema = z.object({
  value: z.number(),
  size: z.number().int(),
  address: createaddressSchema,
  categoryId: z.number().int(),
});

export { createRealEstateSchema };
