import { Router } from "express";
import {
  getAllRealEstateController,
  insertRealEstateController,
} from "../controllers";
import {
  findRepeatedAddressMiddleware,
  userIsAdminMiddleware,
  validateBodyMiddleware,
  validateTokenMiddleware,
} from "../middlewares";
import { createRealEstateSchema } from "../schemas";

const realEstateRouter = Router();

realEstateRouter.post(
  "",
  validateTokenMiddleware,
  userIsAdminMiddleware,
  validateBodyMiddleware(createRealEstateSchema),
  findRepeatedAddressMiddleware,
  insertRealEstateController
);

realEstateRouter.get("", getAllRealEstateController);

export { realEstateRouter };
