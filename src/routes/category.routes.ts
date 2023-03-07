import { Router } from "express";
import {
  getAllCategoriesController,
  getPropertiesByCategoryController,
  insertCategoryController,
} from "../controllers";
import {
  findCategoryByNameMiddleware,
  userIsAdminMiddleware,
  validateTokenMiddleware,
} from "../middlewares";

const categoriesRouter = Router();

categoriesRouter.post(
  "",
  validateTokenMiddleware,
  userIsAdminMiddleware,
  findCategoryByNameMiddleware,
  insertCategoryController
);

categoriesRouter.get("", getAllCategoriesController);

categoriesRouter.get("/:id/realEstate", getPropertiesByCategoryController);

export { categoriesRouter };
