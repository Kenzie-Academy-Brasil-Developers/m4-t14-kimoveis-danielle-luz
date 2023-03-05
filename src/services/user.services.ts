import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { compare, hash } from "bcryptjs";
import { createUserInterface, loginInterface, userRepo } from "../interfaces";
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

  return createdUser;
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

export { insertUserService, findUserByEmailService, loginService };
