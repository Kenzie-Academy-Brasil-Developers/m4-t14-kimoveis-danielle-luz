import { AppDataSource } from "../../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
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

const getPropertiesByCategoryService = async (categoryId: number) => {
  const categoryRepo: categoryRepo = AppDataSource.getRepository(Category);

  try {
    if (isNaN(categoryId)) throw new Error();

    const propertiesWithCategory = (
      await categoryRepo.findOneByOrFail({
        id: categoryId,
      })
    )?.properties;

    return propertiesWithCategory;
  } catch {
    throw new AppError(404, "Category not found");
  }
};

const getCategoryById = (categoryId: number) => {};

export {
  insertCategoryService,
  getAllCategoriesService,
  getPropertiesByCategoryService,
};
