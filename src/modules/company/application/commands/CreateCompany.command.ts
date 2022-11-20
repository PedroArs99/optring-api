import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Company } from '../../models/Company.model';

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
  async execute(command: CreateCompanyCommand): Promise<Company> {
    return new Company(command.name, command.contactEmail);
  }
}
