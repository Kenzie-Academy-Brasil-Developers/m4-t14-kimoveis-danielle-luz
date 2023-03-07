import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { getCategoryByNameService } from "../services";

const findCategoryByName = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const newCategoryName = request.body.name as string;

  const foundCategory = await getCategoryByNameService(newCategoryName);

  if (foundCategory) {
    throw new AppError(409, "Category already exists");
  }

  return next();
};

export { findCategoryByName };
