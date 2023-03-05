import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity()
class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => RealEstate)
  realEstate: RealEstate;
}

export { Schedule };
