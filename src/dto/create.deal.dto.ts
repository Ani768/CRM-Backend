import { DealStage } from "src/entities/deals.entities";

export class CreateDealDto {
    title: string;
    amount: number;
    stage: DealStage;  // Use the enum here
    companyId: number;
    contactIds: number[];
  }

  export class UpdateDealDto {
    title?: string;
    amount?: number;
    stage?: string;
    companyId?: number;
    contactIds?: number[];
  }