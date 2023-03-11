import { FindOperator } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../entities";
import { addressRepo, createRealEstateInterface } from "../interfaces";

const findRepeatedAddressService = async (
  searchedRealEstate: createRealEstateInterface
): Promise<Address | null> => {
  const { number, ...restAddressProperties } = searchedRealEstate.address;
  const addressRepo: addressRepo = AppDataSource.getRepository(Address);

  if (number) {
    const foundAddress = await addressRepo.findOneBy({
      number: number as string | FindOperator<string>,
      ...restAddressProperties,
    });

    return foundAddress;
  }

  const foundAddress = await addressRepo.findOneBy({
    ...restAddressProperties,
  });

  return foundAddress;
};

export { findRepeatedAddressService };
