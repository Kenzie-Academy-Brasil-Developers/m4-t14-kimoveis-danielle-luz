import { Request, Response } from "express";
import { User } from "../entities";
import { createScheduleInterface } from "../interfaces";
import {
  getAllScheduleByRealEstateService,
  insertScheduleService,
} from "../services";

const insertScheduleController = async (
  request: Request,
  response: Response
) => {
  const scheduleData = request.body as createScheduleInterface;
  const userScheduled = request.loggedUser as User;

  const createdSchedule = await insertScheduleService(
    scheduleData,
    userScheduled
  );

  return response.status(201).send(createdSchedule);
};

const getAllScheduleByRealEstateController = async (
  request: Request,
  response: Response
) => {
  const realEstateId = parseInt(request.params.id);

  const schenduleList = await getAllScheduleByRealEstateService(realEstateId);

  return response.status(200).send(schenduleList);
};

export { insertScheduleController, getAllScheduleByRealEstateController };
