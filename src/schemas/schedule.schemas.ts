import { z, ZodError } from "zod";

const createScheduleSchema = z.object({
  date: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/),
  hour: z.string().regex(/^\d{2}:\d{2}$/),
  realEstateId: z.number().int(),
});

export { createScheduleSchema };
