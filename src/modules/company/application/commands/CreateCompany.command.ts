import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Company } from '../../models/Company.model';
import { CompanyRepository } from '../ports/Company.repository';

export class CreateCompanyCommand {
  constructor(
    public readonly name: string,
    public readonly contactEmail: string,
  ) {}
}

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyCommandHandler
  implements ICommandHandler<CreateCompanyCommand, Company>
{
  constructor(
    @Inject('CompanyRepository') private companyRepo: CompanyRepository,
  ) {}

  async execute(command: CreateCompanyCommand): Promise<Company> {
    let newCompany = Company.create(command.name, command.contactEmail);
    newCompany = await this.companyRepo.save(newCompany);

    return newCompany;
  }
}
