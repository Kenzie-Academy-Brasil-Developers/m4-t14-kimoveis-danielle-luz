import { Repository } from "typeorm";
import { z } from "zod";
import { Category, RealEstate } from "../entities";

import { createCategorieSchema } from "../schemas";

type createCategorieInterface = z.infer<typeof createCategorieSchema>;
type categoryRepo = Repository<Category>;

interface propertyWithCategoryData {
  realEstate: RealEstate[];
  id: number;
  name: string;
  properties: RealEstate[];
}

export { createCategorieInterface, categoryRepo, propertyWithCategoryData };
