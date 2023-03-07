import { Router } from "express";
import {
  getAllCategoriesController,
  getPropertiesByCategoryController,
  insertCategoryController,
} from "../controllers";
import { findCategoryByName } from "../middlewares";

const categoriesRouter = Router();

categoriesRouter.post("", findCategoryByName, insertCategoryController);

categoriesRouter.get("", getAllCategoriesController);

categoriesRouter.get("/:id/realEstate", getPropertiesByCategoryController);

export { categoriesRouter };
