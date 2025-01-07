import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "src/entities/companies.entities";
import { CompaniesService } from "./company.service";
import { CompaniesController } from "./company.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Company])], 
  controllers: [CompaniesController],             
  providers: [CompaniesService],                 
})
export class CompanyModule {}