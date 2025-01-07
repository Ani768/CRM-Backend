import { Controller, Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common";
import { ContactService } from "./contacts.service";
import { CreateContactDto } from "src/dto/create.contact.dto";
import { UpdateContactDto } from "src/dto/create.contact.dto";

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(@Body() createContactDto: CreateContactDto) {
    return this.contactService.createContact(createContactDto);
  }

  @Get()
  async getAllContacts(
    @Query('page') page: number = 1,       // Default page 1
    @Query('limit') limit: number = 10,    // Default limit 10
    @Query('sortBy') sortBy: string = 'name', // Default sort by 'name'
    @Query('order') order: 'ASC' | 'DESC' = 'ASC' // Default order 'ASC'
  ) {
    return this.contactService.getAllContacts(page, limit, sortBy, order);
  }

  @Get(':id')
  async getContactById(@Param('id') id: number) {
    return this.contactService.getContactById(id);
  }

  @Put(':id')
  async updateContact(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.updateContact(id, updateContactDto);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: number) {
    return this.contactService.deleteContact(id);
  }
}
