import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { compare, hash } from "bcryptjs";
import {
  createUserInterface,
  loginInterface,
  updateUserInterface,
  userRepo,
} from "../interfaces";
import { AppError } from "../errors";
import { sign } from "jsonwebtoken";
import "dotenv/config";

const insertUserService = async (newUserData: createUserInterface) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const encryptedPassword = await hash(newUserData.password, 10);

  newUserData = { ...newUserData, password: encryptedPassword };

  const createdUser = await userRepository
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(newUserData)
    .execute();

  const { password, ...userWithoutPassword } = createdUser.raw;

  return userWithoutPassword;
};

const updateUserService = async (
  updatedUserId: number,
  updatedUserData: updateUserInterface
) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const updatedDataWithId = { id: updatedUserId, ...updatedUserData };

  await userRepository.save(updatedDataWithId);

  const userAfterUpdate = await userRepository.findOneBy({ id: updatedUserId });

  return userAfterUpdate;
};

const deleteUserService = async (deletedUserId: number) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const deletedUser = await userRepository.findOne({
    where: { id: deletedUserId },
    withDeleted: true,
  });

  if (deletedUser) {
    await userRepository.softRemove(deletedUser);
  }
};

const loginService = async (loginData: loginInterface) => {
  const userRepository = AppDataSource.getRepository(User);

  const { email: loginEmail, password: loginPassword } = loginData;

  const userWithLoginEmail = await userRepository.findOneBy({
    email: loginEmail,
  });

  const emailWasNotFound = !userWithLoginEmail;
  const passwordIsWrong = !(await compare(
    loginPassword,
    String(userWithLoginEmail?.password)
  ));

  if (emailWasNotFound || passwordIsWrong) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = sign({ email: loginEmail }, String(process.env.SECRET_KEY), {
    expiresIn: process.env.EXPIRES_IN,
    subject: loginEmail,
  });

  return { token };
};

const findUserByEmailService = async (searchedEmail: string) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ email: searchedEmail });

  const userWasFound = foundUser !== null;

  return userWasFound;
};

const getAllUsersService = async () => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const allUsers = await userRepository.find({
    select: [
      "id",
      "name",
      "email",
      "admin",
      "createdAt",
      "updatedAt",
      "deletedAt",
    ],
  });

  return allUsers;
};

export {
  insertUserService,
  updateUserService,
  deleteUserService,
  loginService,
  findUserByEmailService,
  getAllUsersService,
};
