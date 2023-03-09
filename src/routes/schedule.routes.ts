import { Router } from "express";
import {
  getAllScheduleByRealEstateController,
  insertScheduleController,
} from "../controllers/schedule.controller";
import {
  findRealEstateByIdMiddleware,
  findScheduleInTheSameTimeMiddleware,
  userIsAdminMiddleware,
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

scheduleRouter.get(
  "/realEstate/:id",
  validateTokenMiddleware,
  userIsAdminMiddleware,
  findRealEstateByIdMiddleware,
  getAllScheduleByRealEstateController
);

export { scheduleRouter };
