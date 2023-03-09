import { Router } from "express";
import {
  findScheduleInTheSameTimeMiddleware,
  validateBodyMiddleware,
  validateDate,
  validateTime,
  validateTokenMiddleware,
} from "../middlewares";
import { createScheduleSchema } from "../schemas";

const scheduleRouter = Router();

scheduleRouter.post(
  "",
  validateTokenMiddleware,
  validateBodyMiddleware(createScheduleSchema),
  validateDate,
  validateTime,
  findScheduleInTheSameTimeMiddleware,
);
