import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import { createScheduleSchema } from "../schemas";

type createScheduleInterface = z.infer<typeof createScheduleSchema>;
type scheduleRepo = Repository<Schedule>;

export { createScheduleInterface, scheduleRepo };
