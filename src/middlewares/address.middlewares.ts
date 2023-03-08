import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { findRepeatedAddressService } from "../services"; 

const findRepeatedAddressMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const searchedAddress = request.body;

  const foundAddress = await findRepeatedAddressService(searchedAddress);

  if (foundAddress) {
    throw new AppError(409, "Address already exists");
  }

  return next();
};

export { findRepeatedAddressMiddleware };
