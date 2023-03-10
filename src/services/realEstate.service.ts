import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../entities";
import {
  addressRepo,
  categoryRepo,
  createRealEstateInterface,
  realEstateRepo,
} from "../interfaces";

const insertRealEstateService = async (
  newRealEstateData: createRealEstateInterface
) => {
  const realEstateRepo: realEstateRepo =
    AppDataSource.getRepository(RealEstate);
  const addressRepo: addressRepo = AppDataSource.getRepository(Address);
  const categoryRepo: categoryRepo = AppDataSource.getRepository(Category);

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
  const realEstateRepo: realEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const allRealEstate = await realEstateRepo
    .createQueryBuilder("realEstate")
    .leftJoinAndMapOne(
      "realEstate.address",
      Address,
      "address",
      "realEstate.addressId = address.id"
    )
    .getMany();

  return allRealEstate.map((estate) => {
    estate.value = parseFloat(estate.value + "").toFixed(2);

    return estate;
  });
};

const findRealEstateByIdService = async (realEstateId: number) => {
  const realEstateRepo: realEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const foundRealEstate = await realEstateRepo.findOneBy({ id: realEstateId });

  return foundRealEstate;
};

export {
  insertRealEstateService,
  getAllRealEstateService,
  findRealEstateByIdService,
};
