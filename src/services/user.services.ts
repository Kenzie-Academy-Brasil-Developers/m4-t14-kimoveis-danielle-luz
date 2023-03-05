import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { createUserInterface, userRepo } from "../interfaces";

const insertUserService = async (newUserData: createUserInterface) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const createdUser = await userRepository
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(newUserData)
    .execute();

  return createdUser;
};

const findUserByEmailService = async (searchedEmail: string) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ email: searchedEmail });

  const userWasFound = foundUser !== null;

  return userWasFound;
};

export { insertUserService, findUserByEmailService };
