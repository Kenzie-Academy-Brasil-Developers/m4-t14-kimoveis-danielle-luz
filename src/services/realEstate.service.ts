import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../entities";
import { createRealEstateInterface } from "../interfaces";

const insertRealEstateService = async (
  newRealEstateData: createRealEstateInterface
) => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const addressRepo = AppDataSource.getRepository(Address);

  const newAddress = await addressRepo.save(
    addressRepo.create([newRealEstateData.address] as DeepPartial<Address>[])
  );

  const newRealEstate = await realEstateRepo.save(
    realEstateRepo.create([newRealEstateData] as DeepPartial<RealEstate>[])
  );

  return newRealEstate;
};
