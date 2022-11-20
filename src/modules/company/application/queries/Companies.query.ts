import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Company } from '../../models/Company.model';
import { CompanyRepository } from '../ports/Company.repository';

export class CompaniesQuery {}

@QueryHandler(CompaniesQuery)
export class CompaniesQueryHandler
  implements IQueryHandler<CompaniesQuery, Company[]>
{
  constructor(
    @Inject('CompanyRepository') private companyRepo: CompanyRepository,
  ) {}

  async execute(query: CompaniesQuery): Promise<Company[]> {
    return this.companyRepo.findAll();
  }
}
