import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLList } from 'graphql';
import { Company } from '../../models/Company.model';
import { AreaDto } from './AreaDto.model';

@ObjectType({ description: 'company' })
export class CompanyDto {
  @Field(_ => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  contactEmail: string;

  @Field(type => [AreaDto])
  areas: AreaDto[];

  static fromDomain(company: Company): CompanyDto {
    return {
      id: company.id,
      name: company.name,
      contactEmail: company.contactEmail,
      areas: company.areas.map(area => AreaDto.fromDomain(area))
    }
  }
}
