import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from 'src/entities/contacts.entities';
import { CreateContactDto, UpdateContactDto } from 'src/dto/create.contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  // Create a new contact
  async createContact(contactData: CreateContactDto): Promise<number> {
    const contact = this.contactRepository.create(contactData);
    const con = await this.contactRepository.save(contact);
    return con.id;
  }

  // Update a contact by ID
  async updateContact(id: number, updateData: UpdateContactDto): Promise<Contact> {
    await this.contactRepository.update(id, updateData);
    return this.getContactById(id); // Return the updated contact
  }

  // Retrieve all contacts
  async getAllContacts(page: number = 1, limit: number = 10, sortBy: string = 'name', order: 'ASC' | 'DESC' = 'ASC'): Promise<Contact[]> {
    return this.contactRepository.find({
      skip: (page - 1) * limit,  // Skip records for pagination
      take: limit,  // Limit records per page
      order: {
        [sortBy]: order,  // Sort the results by field and order
      },
    });
  }

  // Retrieve a contact by ID
  async getContactById(id: number): Promise<Contact | null> {
    return this.contactRepository.findOneBy({ id });
  }

 

  // Delete a contact by ID
  async deleteContact(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}