import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Company } from '../../models/Company.model';

export type CompanyDocument = HydratedDocument<CompanyEntity>;

@Schema({
  collection: 'companies',
})
export class CompanyEntity {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  contactEmail: string;

  constructor(id: string, name: string, contactEmail: string) {
    this._id = id;
    this.name = name;
    this.contactEmail = contactEmail;
  }

  static toDomain(companyEntity: CompanyEntity): Company {
    return Company.load(
      companyEntity._id,
      companyEntity.name,
      companyEntity.contactEmail,
    );
  }

  static fromDomain(company: Company): CompanyEntity {
    return new CompanyEntity(company.id, company.name, company.contactEmail);
  }
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
