// src/dto/create-contact.dto.ts
export class CreateContactDto {
    readonly name: string;
    readonly email: string;
    readonly number: string;
    readonly address?: string;
  }
  
  // src/dto/update-contact.dto.ts
  export class UpdateContactDto {
    readonly name?: string;
    readonly email?: string;
    readonly number?: string;
    readonly address?: string;
  }
  