import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Field, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCompanyCommand } from '../../application/commands/CreateCompany.command';
import { CompaniesQuery } from '../../application/queries/Companies.query';
import { Company } from '../../models/Company.model';
import { CompanyDto } from './CompanyDto.model';

@InputType()
export class CreateCompanyInput {
  @Field()
  name: string;

  @Field()
  contactEmail: string;
}


@Resolver(_ => CompanyDto)
export class CompanyResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
) {}

  @Mutation(_ => CompanyDto)
  async createCompany(@Args('createCompanyData') input: CreateCompanyInput) {
    const command = new CreateCompanyCommand(
        input.name,
        input.contactEmail
    )
    
    const result = await this.commandBus.execute(command);

    return CompanyDto.fromDomain(result)
  }

  @Query(_ => [CompanyDto])
  async companies() {
    const results: Company[] = await this.queryBus.execute(new CompaniesQuery())

    return results.map(company => CompanyDto.fromDomain(company));
  }
}
