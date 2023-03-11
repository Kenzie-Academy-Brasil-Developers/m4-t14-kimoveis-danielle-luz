import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../entities";
import { AppError } from "../errors";
import {
  categoryRepo,
  createCategorieInterface,
  propertyWithCategoryData,
  realEstateRepo,
} from "../interfaces";

const insertCategoryService = async (
  newCategoryData: createCategorieInterface
): Promise<Category | null> => {
  const categoryRepo: categoryRepo = AppDataSource.getRepository(Category);

  await categoryRepo
    .createQueryBuilder()
    .insert()
    .values(newCategoryData)
    .execute();

  const foundCategory = await categoryRepo.findOneBy({
    name: newCategoryData.name,
  });

  return foundCategory;
};

const getAllCategoriesService = async (): Promise<Category[]> => {
  const categoryRepo: categoryRepo = AppDataSource.getRepository(Category);

  const allCategories = await categoryRepo.find();

  return allCategories;
};

const getPropertiesByCategoryService = async (
  categoryId: number
): Promise<propertyWithCategoryData> => {
  const categoryRepo: categoryRepo = AppDataSource.getRepository(Category);
  const realEstateRepo: realEstateRepo =
    AppDataSource.getRepository(RealEstate);

  try {
    if (isNaN(categoryId)) throw new Error();

    const categoryData = await categoryRepo.findOneByOrFail({
      id: categoryId,
    });

    const propertiesWithCategory = await realEstateRepo
      .createQueryBuilder()
      .where("realEstate.categoryId = :categoryId", { categoryId })
      .getMany();

    const propertyWithCategoryData: propertyWithCategoryData = {
      ...categoryData,
      realEstate: propertiesWithCategory,
    };

    return propertyWithCategoryData;
  } catch (error: any) {
    throw new AppError(404, "Category not found");
  }
};

const getCategoryByNameService = async (
  categoryName: string
): Promise<Category | null> => {
  const categoryRepo: categoryRepo = AppDataSource.getRepository(Category);

  const foundCategory = await categoryRepo.findOneBy({ name: categoryName });

  return foundCategory;
};

export {
  insertCategoryService,
  getAllCategoriesService,
  getPropertiesByCategoryService,
  getCategoryByNameService,
};
