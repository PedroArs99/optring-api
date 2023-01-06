import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Company } from '../../models/Company.model';
import { CompanyRepository } from '../ports/Company.repository';

export class CreateAreaCommand {
  constructor(public readonly companyId: string, public readonly name: string) {}
}

@CommandHandler(CreateAreaCommand)
export class CreateAreaCommandHandler implements ICommandHandler<CreateAreaCommand, Company> {
  constructor(@Inject('CompanyRepository') private companyRepo: CompanyRepository) {}

  async execute(command: CreateAreaCommand): Promise<Company> {
    let company = await this.companyRepo.findById(command.companyId);
    company = company.registerNewArea(command.name);

    await this.companyRepo.save(company);

    return company;
  }
}
