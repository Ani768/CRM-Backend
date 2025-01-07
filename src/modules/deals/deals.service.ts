import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from 'src/entities/deals.entities';
import { CreateDealDto, UpdateDealDto } from 'src/dto/create.deal.dto';
import { Company } from 'src/entities/companies.entities';
import { Contact } from 'src/entities/contacts.entities';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>
  ) {}

  async create(createDealDto: CreateDealDto): Promise<Deal> {
    // Create deal with basic properties first
    const deal = new Deal();
    deal.title = createDealDto.title;
    deal.amount = createDealDto.amount;
    deal.stage = createDealDto.stage;
    
    // Set company
    const company = await this.companyRepository.findOne({ 
      where: { id: createDealDto.companyId } 
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createDealDto.companyId} not found`);
    }
    deal.company = company;

    // Save deal first
    const savedDeal = await this.dealRepository.save(deal);

    // Then add contacts if any
    if (createDealDto.contactIds && createDealDto.contactIds.length > 0) {
      const contacts = await this.contactRepository.findByIds(createDealDto.contactIds);
      savedDeal.contacts = contacts;
      return await this.dealRepository.save(savedDeal);
    }

    return savedDeal;
}

  async findAll(
    page: number = 1,
    limit: number = 10,
    stage?: string
  ): Promise<{ data: Deal[]; total: number }> {
    const queryBuilder = this.dealRepository.createQueryBuilder('deal')
      .leftJoinAndSelect('deal.company', 'company')
      .leftJoinAndSelect('deal.contacts', 'contacts');

    if (stage) {
      queryBuilder.where('deal.stage = :stage', { stage });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: number): Promise<Deal> {
    const deal = await this.dealRepository.findOne({
      where: { id },
      relations: ['company', 'contacts'],
    });
    if (!deal) {
      throw new NotFoundException(`Deal with ID ${id} not found`);
    }
    return deal;
  }

  async update(id: number, updateDealDto: UpdateDealDto): Promise<Deal> {
    const deal = await this.findOne(id);
    Object.assign(deal, updateDealDto);
    return await this.dealRepository.save(deal);
  }

  async remove(id: number): Promise<void> {
    const result = await this.dealRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Deal with ID ${id} not found`);
    }
  }

  async addContactsToDeal(dealId: number, contactIds: number[]): Promise<Deal> {
    const deal = await this.findOne(dealId);
    deal.contacts = [...deal.contacts, ...contactIds.map(id => ({ id } as any))];
    return await this.dealRepository.save(deal);
  }

  async removeContactsFromDeal(dealId: number, contactIds: number[]): Promise<Deal> {
    const deal = await this.findOne(dealId);
    deal.contacts = deal.contacts.filter(contact => !contactIds.includes(contact.id));
    return await this.dealRepository.save(deal);
  }
}