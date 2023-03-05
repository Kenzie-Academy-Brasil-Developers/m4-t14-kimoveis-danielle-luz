import { z } from "zod";
import { createUserSchema, loginSchema, updateUserSchema } from "../schemas";

type createUserInterface = z.infer<typeof createUserSchema>;
type updateUserInterface = z.infer<typeof updateUserSchema>;
type loginInterface = z.infer<typeof loginSchema>;

export { createUserInterface, updateUserInterface, loginInterface };
