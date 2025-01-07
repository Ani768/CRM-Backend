import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Contact } from './entities/contacts.entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


}
