import {
  getAllCategoriesController,
  getPropertiesByCategoryController,
  insertCategoryController,
} from "./category.controller";
import {
  getAllRealEstateController,
  insertRealEstateController,
} from "./realEstate.controller";
import { getAllScheduleByRealEstateController } from "./schedule.controller";
import {
  insertUserController,
  updateUserController,
  deleteUserController,
  loginController,
  getAllUsersController,
} from "./user.controller";

export {
  insertUserController,
  updateUserController,
  deleteUserController,
  loginController,
  getAllUsersController,
  insertCategoryController,
  getAllCategoriesController,
  getPropertiesByCategoryController,
  insertRealEstateController,
  getAllRealEstateController,
  getAllScheduleByRealEstateController,
};
