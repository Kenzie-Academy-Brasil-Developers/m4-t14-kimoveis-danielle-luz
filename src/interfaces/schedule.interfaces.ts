import { z } from "zod";
import { createScheduleSchema } from "../schemas";

type createScheduleInterface = z.infer<typeof createScheduleSchema>;

export { createScheduleInterface };
