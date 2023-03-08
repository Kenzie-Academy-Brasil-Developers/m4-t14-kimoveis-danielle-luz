import { Request, Response } from "express";
import { createRealEstateInterface } from "../interfaces";
import { getAllRealEstateService, insertRealEstateService } from "../services";

const insertRealEstateController = async (
  request: Request,
  response: Response
) => {
  const realEstateData: createRealEstateInterface = request.body;

  const newRealEstate = await insertRealEstateService(realEstateData);

  return response.status(201).send(newRealEstate);
};

const getAllRealEstateController = async (
  request: Request,
  response: Response
) => {
  const allRealEstate = await getAllRealEstateService();

  return response.status(200).send(allRealEstate);
};

export { insertRealEstateController, getAllRealEstateController };
