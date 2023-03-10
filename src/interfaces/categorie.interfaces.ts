import { Repository } from "typeorm";
import { z } from "zod";
import { Category } from "../entities";

import { createCategorieSchema } from "../schemas";

type createCategorieInterface = z.infer<typeof createCategorieSchema>;
type categoryRepo = Repository<Category>;

export { createCategorieInterface, categoryRepo };
