import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { findUserByEmailService } from "../services";

const findUserByEmailMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const searchedEmail = request.body.email;

  const userWasFound = await findUserByEmailService(searchedEmail);

  if (userWasFound) {
    throw new AppError(409, "Email already exists");
  }

  return next();
};

export { findUserByEmailMiddleware };
