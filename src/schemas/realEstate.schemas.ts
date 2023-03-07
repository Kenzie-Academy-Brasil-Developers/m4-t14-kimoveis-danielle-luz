import { z } from "zod";
import { createAddressSchema } from "./address.schemas";

const createRealEstateSchema = z.object({
  value: z.number(),
  size: z.number().int().positive(),
  address: createAddressSchema,
  categoryId: z.number().int(),
});

export { createRealEstateSchema };
