import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contacts.entities';

@Injectable()
export class AppService {
  constructor(@InjectRepository(Contact) private readonly test:Repository<Contact>){
  }

  }

