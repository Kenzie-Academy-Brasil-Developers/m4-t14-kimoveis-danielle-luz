import { z } from "zod";

import { createCategorieSchema } from "../schemas";

type createCategorieInterface = z.infer<typeof createCategorieSchema>;

export { createCategorieInterface };
