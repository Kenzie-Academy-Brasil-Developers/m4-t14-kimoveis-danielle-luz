import { AppDataSource } from "../../data-source";
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

  let { password, ...userWithoutPassword } = createdUser.raw[0];

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
    subject: String(userWithLoginEmail.id),
  });

  return { token };
};

const findUserByEmailService = async (searchedEmail: string) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ email: searchedEmail });

  return foundUser;
};

const findUserByIdService = async (searchedId: number) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ id: searchedId });

  return foundUser;
};

const getAllUsersService = async () => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  let allUsers = await userRepository.find({
    select: [
      "admin",
      "createdAt",
      "deletedAt",
      "email",
      "id",
      "name",
      "updatedAt",
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
  findUserByIdService,
  getAllUsersService,
};
