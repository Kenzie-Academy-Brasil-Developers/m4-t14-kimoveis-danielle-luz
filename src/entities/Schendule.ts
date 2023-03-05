import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./RealEstate";
import User from "./User";

@Entity("schendules_users_properties")
class Schendule {
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

export { Schendule };
