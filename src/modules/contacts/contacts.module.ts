import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { db } from "src/db.connect";
import { Contact } from "src/entities/contacts.entities";
import { ContactController } from "./contacts.controller";
import { ContactService } from "./contacts.service";

@Module({
    imports: [db, TypeOrmModule.forFeature([Contact])],
    controllers: [ContactController], // Add the ContactController
    providers: [ContactService],     // Add the ContactService
})
export class ContactModule {}
