import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { findRealEstateByIdService } from "../services";

const findRealEstateByIdMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const realEstateId = parseInt(request.body.realEstateId);

  if (isNaN(realEstateId)) throw new AppError(404, "RealEstate not found");

  const foundRealEstate = await findRealEstateByIdService(realEstateId);

  if (!foundRealEstate) throw new AppError(404, "RealEstate not found");

  return next();
};

export { findRealEstateByIdMiddleware };
