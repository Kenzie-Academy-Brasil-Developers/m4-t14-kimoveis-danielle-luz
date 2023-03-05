import { Repository } from "typeorm";
import { z } from "zod";
import { User } from "../entities";
import { createUserSchema, loginSchema, updateUserSchema } from "../schemas";

type createUserInterface = z.infer<typeof createUserSchema>;
type updateUserInterface = z.infer<typeof updateUserSchema>;
type loginInterface = z.infer<typeof loginSchema>;
type userRepo = Repository<User>;

export { createUserInterface, updateUserInterface, loginInterface, userRepo };
