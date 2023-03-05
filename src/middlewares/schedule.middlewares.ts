import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const validateDate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const dateValue = request.body.date;

  const dateObject = new Date(dateValue);

  const isNotWorkDays = dateObject.getDay() === 0 || dateObject.getDay() === 6;

  if (isNotWorkDays) {
    throw new AppError(400, "Invalid date, work days are monday to friday");
  }

  return next();
};

const validateTime = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const time = request.body.hour;

  const hour = parseInt(time.split(":")[0]);
  const minutes = parseInt(time.split(":")[1]);

  const invalidCommercialHour = hour < 8 || hour > 18;
  const invalidMinutes = minutes < 0 || minutes > 59;

  if (invalidCommercialHour || invalidMinutes) {
    throw new AppError(400, "Invalid hour, available times are 8AM to 18PM");
  }

  return next();
};

export { validateDate, validateTime };
