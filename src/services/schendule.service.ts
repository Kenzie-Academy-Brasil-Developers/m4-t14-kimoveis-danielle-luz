import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../entities";
import {
  createScheduleInterface,
  realEstateRepo,
  scheduleRepo,
} from "../interfaces";

const insertSchenduleService = async (
  newSchedule: createScheduleInterface,
  userScheduled: User
) => {
  const { realEstateId, ...scheduleTime } = newSchedule;

  const scheduleRepo: scheduleRepo = AppDataSource.getRepository(Schedule);
  const realEstateRepo: realEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstateScheduled = (await realEstateRepo.findOneBy({
    id: newSchedule.realEstateId,
  })) as RealEstate;

  const createdSchedule = await scheduleRepo
    .createQueryBuilder()
    .insert()
    .into(Schedule)
    .values({
      ...scheduleTime,
      user: userScheduled,
      realEstate: realEstateScheduled,
    })
    .returning(["*"])
    .execute();

  return createdSchedule;
};
