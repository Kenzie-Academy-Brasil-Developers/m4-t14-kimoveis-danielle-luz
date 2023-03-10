import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import "express-async-errors";

class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }
}

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).send({ message: error.message });
  } else if (error instanceof ZodError) {
    return response.status(400).send({ message: error.flatten().fieldErrors });
  } else if (error) {
    console.log(error.stack);
    return response.status(500).send({ message: "Internal server error" });
  }

  return next();
};

export { AppError, errorHandler };
