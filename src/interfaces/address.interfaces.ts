import { Repository } from "typeorm";
import { z } from "zod";
import { Address } from "../entities";
import { createAddressSchema } from "../schemas/address.schemas";

type createAddressInterface = z.infer<typeof createAddressSchema>;
type addressRepo = Repository<Address>;

export { createAddressInterface, addressRepo };
