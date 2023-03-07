import { Router } from "express";
import {
  getAllCategoriesController,
  getPropertiesByCategoryController,
  insertCategoryController,
} from "../controllers";
import {
  findCategoryByNameMiddleware,
  userIsAdminMiddleware,
  validateBodyMiddleware,
  validateTokenMiddleware,
} from "../middlewares";
import { createCategorieSchema } from "../schemas";

const categoriesRouter = Router();

categoriesRouter.post(
  "",
  validateTokenMiddleware,
  userIsAdminMiddleware,
  validateBodyMiddleware(createCategorieSchema),
  findCategoryByNameMiddleware,
  insertCategoryController
);

categoriesRouter.get("", getAllCategoriesController);

categoriesRouter.get("/:id/realEstate", getPropertiesByCategoryController);

export { categoriesRouter };
