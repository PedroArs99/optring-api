import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Area } from '../../models/Area.model';
import { Company } from '../../models/Company.model';
import { AreaEntity } from './Area.entity';

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

  @Prop([{ type: AreaEntity }])
  areas: AreaEntity[];

  constructor(id: string, name: string, contactEmail: string, areas: Area[]) {
    this._id = id;
    this.name = name;
    this.contactEmail = contactEmail;
    this.areas = areas.map(area => AreaEntity.fromDomain(area));
  }

  static toDomain(companyEntity: CompanyEntity): Company {
    return Company.load(
      companyEntity._id,
      companyEntity.name,
      companyEntity.contactEmail,
      companyEntity.areas.map(area => AreaEntity.toDomain(area)),
    );
  }

  static fromDomain(company: Company): CompanyEntity {
    return new CompanyEntity(company.id, company.name, company.contactEmail, company.areas);
  }
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
