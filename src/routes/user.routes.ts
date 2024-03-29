import { Router } from "express";
import {
  deleteUserController,
  getAllUsersController,
  insertUserController,
  updateUserController,
} from "../controllers";
import {
  checkUpdatePermission,
  findUserByEmailMiddleware,
  findUserByIdMiddleware,
  userIsAdminMiddleware,
  validateBodyMiddleware,
  validateTokenMiddleware,
} from "../middlewares";
import { createUserSchema, updateUserSchema } from "../schemas";

const usersRouter = Router();

usersRouter.post(
  "",
  validateBodyMiddleware(createUserSchema),
  findUserByEmailMiddleware,
  insertUserController
);

usersRouter.get(
  "",
  validateTokenMiddleware,
  userIsAdminMiddleware,
  getAllUsersController
);

usersRouter.patch(
  "/:id",
  findUserByIdMiddleware,
  validateTokenMiddleware,
  checkUpdatePermission,
  validateBodyMiddleware(updateUserSchema),
  findUserByEmailMiddleware,
  updateUserController
);

usersRouter.delete(
  "/:id",
  findUserByIdMiddleware,
  validateTokenMiddleware,
  userIsAdminMiddleware,
  deleteUserController
);

export { usersRouter };
