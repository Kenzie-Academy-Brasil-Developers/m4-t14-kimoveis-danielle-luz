import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { findRepeatedAddressMiddleware } from "./address.middlewares";
import { findCategoryByNameMiddleware } from "./category.middleware";
import { findRealEstateByIdMiddleware } from "./realEstate.middlewares";
import {
  findScheduleInTheSameTimeMiddleware,
  validateDate,
  validateTime,
} from "./schedule.middlewares";
import {
  findUserByEmailMiddleware,
  findUserByIdMiddleware,
  validateTokenMiddleware,
  userIsAdminMiddleware,
  checkUpdatePermission,
} from "./user.middlewares";

const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { body: payload } = request;

    const validatedBody = schema.parse(payload);

    request.body = validatedBody;

    return next();
  };

export {
  validateBodyMiddleware,
  validateDate,
  validateTime,
  findUserByEmailMiddleware,
  findUserByIdMiddleware,
  validateTokenMiddleware,
  userIsAdminMiddleware,
  checkUpdatePermission,
  findCategoryByNameMiddleware,
  findRepeatedAddressMiddleware,
  findRealEstateByIdMiddleware,
  findScheduleInTheSameTimeMiddleware,
};
