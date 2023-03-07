import { Request, Response } from "express";
import { createCategorieInterface } from "../interfaces";
import {
  getPropertiesByCategoryService,
  insertCategoryService,
} from "../services";

const insertCategoryController = async (
  request: Request,
  response: Response
) => {
  const newCategoryData: createCategorieInterface = request.body;

  const createdCategory = await insertCategoryService(newCategoryData);

  return response.status(201).send(createdCategory);
};

const getAllCategoriesController = async (
  request: Request,
  response: Response
) => {};

const getPropertiesByCategoryController = async (
  request: Request,
  response: Response
) => {
  const categoryId = parseInt(request.params.id);

  const propertiesWithCategory = await getPropertiesByCategoryService(
    categoryId
  );

  return response.status(200).send(propertiesWithCategory);
};

export {
  insertCategoryController,
  getAllCategoriesController,
  getPropertiesByCategoryController,
};
