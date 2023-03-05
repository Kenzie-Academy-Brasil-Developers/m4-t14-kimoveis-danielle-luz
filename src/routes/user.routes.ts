import { Router } from "express";
import { findUserByEmailMiddleware } from "../middlewares";

const usersRouter = Router();

usersRouter.post("", findUserByEmailMiddleware);

export { usersRouter };
