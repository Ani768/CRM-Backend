import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deal } from "src/entities/deals.entities";
import { DealService } from "./deals.service";
import { DealController } from "./deals.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Deal])],
  controllers: [DealController],
  providers: [DealService],
})
export class DealModule {}