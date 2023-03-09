import { Request, Response } from "express";
import { User } from "../entities";
import { createScheduleInterface } from "../interfaces";
import { insertScheduleService } from "../services";

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

export { insertScheduleController };
