import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { db } from './db.connect';
import { Contact } from './entities/contacts.entities';
import { ContactModule } from './modules/contacts/contacts.module';
import { CompanyModule } from './modules/company/company.module';
import { DealModule } from './modules/deals/deals.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Deal } from './entities/deals.entities';
import { Company } from './entities/companies.entities';

@Module({
  imports: [db,TypeOrmModule.forFeature([Contact]),TypeOrmModule.forFeature([Company]),TypeOrmModule.forFeature([Deal]), CompanyModule, DealModule, AuthModule,ConfigModule.forRoot({
    isGlobal: true, // Makes ConfigModule available globally
  }),
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
