import { AppDataSource } from "../../data-source";
import { User } from "../entities";
import { compare, hash } from "bcryptjs";
import {
  createUserInterface,
  getUserInterface,
  loginInterface,
  tokenReturn,
  updateUserInterface,
  userRepo,
} from "../interfaces";
import { AppError } from "../errors";
import { sign } from "jsonwebtoken";
import "dotenv/config";

const insertUserService = async (
  newUserData: createUserInterface
): Promise<getUserInterface> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const encryptedPassword = await hash(newUserData.password, 10);

  newUserData = { ...newUserData, password: encryptedPassword };

  await userRepository
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(newUserData)
    .execute();

  const userAfterInsert = await userRepository.findOneBy({
    email: newUserData.email,
  });

  const { password, ...userWithoutPassword } = userAfterInsert as User;

  return userWithoutPassword as getUserInterface;
};

const updateUserService = async (
  updatedUserId: number,
  updatedUserData: updateUserInterface
): Promise<getUserInterface> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const updatedDataWithId = { id: updatedUserId, ...updatedUserData };

  await userRepository.save(updatedDataWithId as User);

  const userAfterUpdate = await userRepository.findOneBy({ id: updatedUserId });

  const { password, ...userWithoutPassword } = userAfterUpdate as User;

  return userWithoutPassword;
};

const deleteUserService = async (deletedUserId: number): Promise<void> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const deletedUser = await userRepository.findOne({
    where: { id: deletedUserId },
    withDeleted: true,
  });

  if (deletedUser) {
    await userRepository.softRemove(deletedUser);
  }
};

const loginService = async (
  loginData: loginInterface
): Promise<tokenReturn> => {
  const userRepository = AppDataSource.getRepository(User);

  const { email: loginEmail, password: loginPassword } = loginData;

  const userWithLoginEmail = await userRepository.findOneBy({
    email: loginEmail,
  });

  const foundUserPassword = String(userWithLoginEmail?.password);

  const emailWasNotFound = !userWithLoginEmail;
  const passwordIsWrong = !(
    (await compare(loginPassword, foundUserPassword)) ||
    loginPassword === foundUserPassword
  );

  if (emailWasNotFound || passwordIsWrong) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = sign({ email: loginEmail }, String(process.env.SECRET_KEY), {
    expiresIn: process.env.EXPIRES_IN,
    subject: String(userWithLoginEmail.id),
  });

  return { token };
};

const findUserByEmailService = async (
  searchedEmail: string
): Promise<User | null> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ email: searchedEmail });

  return foundUser;
};

const findUserByIdService = async (
  searchedId: number
): Promise<User | null> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ id: searchedId });

  return foundUser;
};

const getAllUsersService = async (): Promise<User[]> => {
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
