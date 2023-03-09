import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../entities";
import { AppError } from "../errors";
import {
  createScheduleInterface,
  realEstateRepo,
  scheduleRepo,
} from "../interfaces";

const insertScheduleService = async (
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
    .execute();

  const createdScheduleSearched = scheduleRepo.findOneBy({
    id: createdSchedule.generatedMaps[0].id,
  });

  return { message: "Schedule created" };
};

const findScheduleInTheSameTimeService = async (
  newSchedule: createScheduleInterface,
  userScheduledId: number
) => {
  const scheduleRepo: scheduleRepo = AppDataSource.getRepository(Schedule);

  const foundScheduleWithSameTime = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date: newSchedule.date })
    .andWhere("schedule.hour = :hour", { hour: newSchedule.hour })
    .andWhere("schedule.realEstateId = :realEstateId", {
      realEstateId: newSchedule.realEstateId,
    })
    .getExists();

  if (foundScheduleWithSameTime)
    throw new AppError(
      409,
      "Schedule to this real estate at this date and time already exists"
    );

  const findScheduleWithSameUserAndTime = await scheduleRepo
    .createQueryBuilder()
    .where("schedule.date = :date", { date: newSchedule.date })
    .andWhere("schedule.hour = :hour", { hour: newSchedule.hour })
    .andWhere("schedule.userId = :userId", { userId: userScheduledId })
    .getExists();

  if (findScheduleWithSameUserAndTime)
    throw new AppError(
      409,
      "User schedule to this real estate at this date and time already exists"
    );
};

export { insertScheduleService, findScheduleInTheSameTimeService };
