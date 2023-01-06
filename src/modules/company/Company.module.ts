import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyEntity, CompanySchema } from './adapters/db/company.entity';
import { CompanyMongoRepository } from './adapters/db/Company.repository';
import { CompanyResolver } from './adapters/graphql/Company.resolver';
import { CreateAreaCommandHandler } from './application/commands/CreateArea.command';
import { CreateCompanyCommandHandler } from './application/commands/CreateCompany.command';
import { CompaniesQueryHandler } from './application/queries/Companies.query';

const commandHandlers = [CreateCompanyCommandHandler, CreateAreaCommandHandler];
const graphQLResolvers = [CompanyResolver];
const queryHandlers = [CompaniesQueryHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: CompanyEntity.name, schema: CompanySchema },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...graphQLResolvers,
    ...queryHandlers,
    {
      provide: 'CompanyRepository',
      useClass: CompanyMongoRepository,
    },
  ],
})
export class CompanyModule {}
