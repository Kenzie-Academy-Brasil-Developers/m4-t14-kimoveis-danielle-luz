import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { nullable } from "zod";
import { Address } from "./Address";
import { Category } from "./Category";
import { Schendule } from "./Schendule";

@Entity("real_state")
class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @OneToOne(() => Address)
  address: Address;

  @OneToMany(() => Schendule, (schendule) => schendule.realEstate)
  schendules: Schendule[];
}

export { RealEstate };
