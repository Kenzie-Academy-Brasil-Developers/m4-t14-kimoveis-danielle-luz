import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../entities";
import { createRealEstateInterface } from "../interfaces";

const insertRealEstateService = async (
  newRealEstateData: createRealEstateInterface
) => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const addressRepo = AppDataSource.getRepository(Address);
  const categoryRepo = AppDataSource.getRepository(Category);

  const newAddress = await addressRepo.save(
    addressRepo.create([newRealEstateData.address] as DeepPartial<Address>[])
  );

  let newRealEstate = (
    await realEstateRepo.save(
      realEstateRepo.create([newRealEstateData] as DeepPartial<RealEstate>[])
    )
  )[0];

  const estateCategory = await categoryRepo.findOneBy({
    id: newRealEstateData.categoryId,
  });

  newRealEstate.address = newAddress[0];

  newRealEstate = { ...newRealEstate, category: estateCategory as Category };

  return newRealEstate;
};

const getAllRealEstateService = async () => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);

  const allRealEstate = await realEstateRepo.find();

  return allRealEstate;

};

export { insertRealEstateService, getAllRealEstateService };
