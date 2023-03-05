import { z } from "zod";
import { createSchenduleSchema } from "../schemas";

type createSchenduleInterface = z.infer<typeof createSchenduleSchema>;

export { createSchenduleInterface };
