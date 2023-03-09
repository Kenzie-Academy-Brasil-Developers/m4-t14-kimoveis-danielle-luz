import { Router } from "express";
import { insertScheduleController } from "../controllers/schedule.controller";
import {
  findRealEstateByIdMiddleware,
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
  findRealEstateByIdMiddleware,
  findScheduleInTheSameTimeMiddleware,
  insertScheduleController
);

export { scheduleRouter };
