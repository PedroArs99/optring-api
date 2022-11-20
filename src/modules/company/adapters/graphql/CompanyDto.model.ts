import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Company } from '../../models/Company.model';

@ObjectType({ description: 'company' })
export class CompanyDto {
  @Field(_ => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  contactEmail: string;

  static fromDomain(company: Company): CompanyDto {
    return {
      id: company.id,
      name: company.name,
      contactEmail: company.contactEmail
    }
  }
}
