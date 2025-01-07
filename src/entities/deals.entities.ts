import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from "typeorm";
  import { Company } from "./companies.entities";
  import { Contact } from "./contacts.entities";
  
  export enum DealStage {
    OPEN = "Open",
    IN_PROGRESS = "In Progress",
    CLOSED = "Closed",
  }
  
  @Entity()
  export class Deal {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    amount: number;
  
    @Column({
      type: "enum",
      enum: DealStage,
      default: DealStage.OPEN,
    })
    stage: DealStage;
  
    @ManyToOne(() => Company, (company) => company.deals, { nullable: false })
    company: Company;
  
    @ManyToMany(() => Contact, (contact) => contact.deals)
    @JoinTable()
    contacts: Contact[];
  }