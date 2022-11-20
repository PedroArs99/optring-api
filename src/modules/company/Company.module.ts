import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CompanyResolver } from './adapters/graphql/Company.resolver';
import { CreateCompanyCommandHandler } from './application/commands/CreateCompany.command';
import { CompaniesQueryHandler } from './application/queries/Companies.query';

const commandHandlers = [CreateCompanyCommandHandler];
const graphQLResolvers = [CompanyResolver];
const queryHandlers = [CompaniesQueryHandler];

@Module({
  imports: [CqrsModule],
  providers: [...commandHandlers, ...graphQLResolvers, ...queryHandlers],
})
export class CompanyModule {}
