import { AppDataSource } from "../../data-source";
import { Category } from "../entities";
import { categoryRepo, createCategorieInterface } from "../interfaces";

const insertCategoryService = async (
  newCategoryData: createCategorieInterface
) => {
  const categoryRepo: categoryRepo = AppDataSource.getRepository(Category);

  const createdCategory = await categoryRepo
    .createQueryBuilder()
    .insert()
    .values(newCategoryData)
    .execute();

  return createdCategory.generatedMaps[0];
};

const getAllCategoriesService = async () => {
  const categoryRepo: categoryRepo = AppDataSource.getRepository(Category);

  const allCategories = await categoryRepo.find();

  return allCategories;
};

export { insertCategoryService, getAllCategoriesService };
