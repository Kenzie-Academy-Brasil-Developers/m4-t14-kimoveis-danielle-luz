import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { findUserByEmailService, findUserByIdService } from "../services";

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

const findUserByIdMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const searchedId = parseInt(request.params.id);

  const idIsNotAnumber = isNaN(searchedId);
  let userWasNotFound: boolean = false;

  if (!idIsNotAnumber) {
    userWasNotFound = !(await findUserByIdService(searchedId));
  }

  if (idIsNotAnumber || userWasNotFound) {
    throw new AppError(404, "User not found");
  }

  return next();
};

//middleware de validação de token

//middleware de validação de permissão

//middleware que checa se o dado alterado é do próprio usuário

export { findUserByEmailMiddleware };
