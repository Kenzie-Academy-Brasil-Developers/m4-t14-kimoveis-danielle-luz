import { Router } from "express";
import {
  getAllRealEstateController,
  insertRealEstateController,
} from "../controllers";
import { validateBodyMiddleware } from "../middlewares";
import { createRealEstateSchema } from "../schemas";

const realEstateRouter = Router();

realEstateRouter.post(
  "",
  validateBodyMiddleware(createRealEstateSchema),
  insertRealEstateController
);

realEstateRouter.get("", getAllRealEstateController);

export { realEstateRouter };
