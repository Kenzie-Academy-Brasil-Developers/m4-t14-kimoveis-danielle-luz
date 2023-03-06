import { z } from "zod";

const getUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().optional().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

const createUserSchema = getUserSchema.pick({
  name: true,
  email: true,
  password: true,
  admin: true,
});

const updateUserSchema = createUserSchema.omit({ admin: true });

const loginSchema = createUserSchema.pick({ email: true, password: true });

export { getUserSchema, createUserSchema, updateUserSchema, loginSchema };
