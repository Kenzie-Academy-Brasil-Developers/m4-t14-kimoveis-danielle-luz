import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schendules_users_properties")
class Schendule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  date: string;

  @Column({ type: "time" })
  hour: string;
}

export { Schendule };
