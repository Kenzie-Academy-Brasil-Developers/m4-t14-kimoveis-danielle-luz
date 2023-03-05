import { z } from "zod";
import { createAddressSchema } from "../schemas/address.schemas";

type createAddressInterface = z.infer<typeof createAddressSchema>;

export { createAddressInterface };
