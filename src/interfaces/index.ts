import { createAddressInterface, addressRepo } from "./address.interfaces";
import {
  createCategorieInterface,
  categoryRepo,
  propertyWithCategoryData,
} from "./categorie.interfaces";
import {
  createRealEstateInterface,
  realEstateRepo,
} from "./realEstate.interfaces";
import {
  createScheduleInterface,
  scheduleMessage,
  scheduleRepo,
  scheduleWithPropertyData,
} from "./schedule.interfaces";
import {
  getUserInterface,
  createUserInterface,
  updateUserInterface,
  selectUserInterface,
  loginInterface,
  token,
  userRepo,
  tokenReturn,
} from "./user.interfaces";

export {
  createAddressInterface,
  createCategorieInterface,
  categoryRepo,
  createRealEstateInterface,
  createScheduleInterface,
  getUserInterface,
  createUserInterface,
  updateUserInterface,
  selectUserInterface,
  loginInterface,
  token,
  userRepo,
  scheduleRepo,
  realEstateRepo,
  addressRepo,
  propertyWithCategoryData,
  scheduleMessage,
  scheduleWithPropertyData,
  tokenReturn,
};
