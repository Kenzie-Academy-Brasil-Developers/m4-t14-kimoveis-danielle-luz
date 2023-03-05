import { z } from "zod";
import { createRealEstateSchema } from "../schemas";

type createRealEstateInterface = z.infer<typeof createRealEstateSchema>;

export { createRealEstateInterface };
