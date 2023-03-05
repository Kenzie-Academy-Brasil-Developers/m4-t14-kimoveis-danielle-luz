import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { AppError } from "../errors";
import { token } from "../interfaces";
import { findUserByEmailService, findUserByIdService } from "../services";

const findUserByEmailMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const searchedEmail = request.body.email;

  if (searchedEmail) {
    const userWasFound = await findUserByEmailService(searchedEmail);

    if (userWasFound) {
      throw new AppError(409, "Email already exists");
    }
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

const validateTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tokenWithBearer = request.headers?.authorization;

  const tokenWasNotSent = !tokenWithBearer;

  if (tokenWasNotSent) {
    throw new AppError(401, "Missing Bearer Token");
  }

  const token = String(tokenWithBearer).split(" ")[1];

  return verify(
    token,
    String(process.env.SECRET_KEY),
    async (
      error: VerifyErrors | null,
      decoded: string | JwtPayload | undefined
    ) => {
      if (error) {
        throw new AppError(401, error.message);
      }

      decoded = decoded as token;

      const foundUser = await findUserByEmailService(decoded?.email);

      request.loggedUser = foundUser;

      return next();
    }
  );
};

const userIsAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userIsNotAdmin = !request.loggedUser?.admin;

  if (userIsNotAdmin) {
    throw new AppError(403, "Insufficient permission");
  }

  return next();
};

const checkUpdatePermission = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const updatedUserId = parseInt(request.params.id);

  const loggedUserHasSameId = request.loggedUser?.id === updatedUserId;

  const isAdmin = request.loggedUser?.admin;

  if (!loggedUserHasSameId && !isAdmin) {
    throw new AppError(403, "Insufficient permission");
  }

  return next();
};

export {
  findUserByEmailMiddleware,
  findUserByIdMiddleware,
  validateTokenMiddleware,
  checkUpdatePermission,
  userIsAdminMiddleware,
};
