import { Request, Response } from "express";
import {
  deleteUserService,
  getAllUsersService,
  insertUserService,
  loginService,
  updateUserService,
} from "../services";

const insertUserController = async (request: Request, response: Response) => {
  const newUserData = request.body;

  const createdUser = await insertUserService(newUserData);

  return response.status(201).send(createdUser);
};

const updateUserController = async (request: Request, response: Response) => {
  const updatedUserId = parseInt(request.params.id);
  const updatedUserData = request.body;

  const updatedUser = await updateUserService(updatedUserId, updatedUserData);

  return response.status(200).send(updatedUser);
};

const deleteUserController = async (request: Request, response: Response) => {
  const deletedUserId = parseInt(request.params.id);

  await deleteUserService(deletedUserId);

  return response.status(204).send();
};

const loginController = async (request: Request, response: Response) => {
  const loginData = request.body;

  const token = await loginService(loginData);

  return response.status(200).send(token);
};

const getAllUsersController = async (request: Request, response: Response) => {
  const allUsers = await getAllUsersService();

  return response.status(200).send(allUsers);
};

export {
  insertUserController,
  updateUserController,
  deleteUserController,
  loginController,
  getAllUsersController,
};
