import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DealService } from './deals.service';
import { CreateDealDto, UpdateDealDto } from 'src/dto/create.deal.dto';

@Controller('deals')
export class DealController {
  constructor(private readonly dealsService: DealService) {}

  @Post()
  create(@Body() createDealDto: CreateDealDto) {
    return this.dealsService.create(createDealDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('stage') stage?: string
  ) {
    return this.dealsService.findAll(page, limit, stage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealsService.update(+id, updateDealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealsService.remove(+id);
  }

  @Post(':id/contacts')
  addContacts(@Param('id') id: string, @Body('contactIds') contactIds: number[]) {
    return this.dealsService.addContactsToDeal(+id, contactIds);
  }

  @Delete(':id/contacts')
  removeContacts(@Param('id') id: string, @Body('contactIds') contactIds: number[]) {
    return this.dealsService.removeContactsFromDeal(+id, contactIds);
  }
}