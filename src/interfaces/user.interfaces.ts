import { Repository } from "typeorm";
import { z } from "zod";
import { User } from "../entities";
import { createUserSchema, getUserSchema, loginSchema, updateUserSchema } from "../schemas";

type getUserInterface = z.infer<typeof getUserSchema>;
type createUserInterface = z.infer<typeof createUserSchema>;
type updateUserInterface = z.infer<typeof updateUserSchema>;
type loginInterface = z.infer<typeof loginSchema>;
type selectUserInterface = {
  id: number;
} & createUserInterface;
type userRepo = Repository<User>;

interface token {
  email: string;
  admin?: boolean;
  iat: number;
  exp: number;
  sub: string;
}

export {
  getUserInterface,
  createUserInterface,
  updateUserInterface,
  loginInterface,
  selectUserInterface,
  token,
  userRepo,
};
