import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Company } from '../../models/Company.model';

export class CompaniesQuery {}

@QueryHandler(CompaniesQuery)
export class CompaniesQueryHandler
  implements IQueryHandler<CompaniesQuery, Company[]> {
    
    async execute(query: CompaniesQuery): Promise<Company[]> {
        return [];
    }
}
