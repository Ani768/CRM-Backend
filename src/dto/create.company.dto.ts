// src/dto/create-contact.dto.ts
export class CreateCompanyDto {
    readonly name: string;
    readonly domain: string;
    readonly industry: string;
    readonly address?: string;
  }
  
  // src/dto/update-contact.dto.ts
  export class UpdateCompanyDto {
    readonly name?: string;
    readonly domain?: string;
    readonly industry?: string;
    readonly address?: string;
  }
  