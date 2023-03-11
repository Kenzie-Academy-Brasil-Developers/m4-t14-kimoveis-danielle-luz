import { Repository } from "typeorm";
import { z } from "zod";
import { Address, Category, Schedule } from "../entities";
import { createScheduleSchema } from "../schemas";

type createScheduleInterface = z.infer<typeof createScheduleSchema>;
type scheduleRepo = Repository<Schedule>;

interface scheduleMessage {
  message: string;
}

interface scheduleWithPropertyData {
  schedules: Schedule[];
  id?: number;
  sold?: boolean;
  value?: string | number;
  size?: number;
  createdAt?: Date;
  updatedAt?: Date;
  category?: Category;
  address?: Address;
}

export {
  createScheduleInterface,
  scheduleRepo,
  scheduleMessage,
  scheduleWithPropertyData,
};
