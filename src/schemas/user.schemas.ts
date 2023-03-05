import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().optional().default(false),
});

const updateUserSchema = createUserSchema.omit({ admin: true });

const loginSchema = createUserSchema.pick({ email: true, password: true });

export { createUserSchema, updateUserSchema, loginSchema };
