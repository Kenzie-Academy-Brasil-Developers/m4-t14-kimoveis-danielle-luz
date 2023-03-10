import { Repository } from "typeorm";
import { z } from "zod";
import { RealEstate } from "../entities";
import { createRealEstateSchema } from "../schemas";

type createRealEstateInterface = z.infer<typeof createRealEstateSchema>;
type realEstateRepo = Repository<RealEstate>;

export { createRealEstateInterface, realEstateRepo };
