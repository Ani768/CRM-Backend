import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Contact } from "./contacts.entities";
import { Deal } from "./deals.entities";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  domain: string;

  @Column()
  industry: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Contact, (contact) => contact.company)
  contacts: Contact[];

  @OneToMany(() => Deal, (deal) => deal.company)
  deals: Deal[];
}