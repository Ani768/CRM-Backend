import {TypeOrmModule} from "@nestjs/typeorm";
import { Contact } from "./entities/contacts.entities";

export  const db =  TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ani',
      password: 'new',
      database: 'my_db',
      entities: [Contact],
      synchronize: true,
})