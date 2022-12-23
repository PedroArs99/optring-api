import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyRepository } from '../../application/ports/Company.repository';
import { Company } from '../../models/Company.model';
import { CompanyDocument, CompanyEntity } from './company.entity';

@Injectable()
export class CompanyMongoRepository implements CompanyRepository {
  constructor(
    @InjectModel(CompanyEntity.name)
    private companyModel: Model<CompanyDocument>,
  ) {}
  
  async findById(id: string): Promise<Company> {
    const entity = await this.companyModel.findById(id).exec();

    return CompanyEntity.toDomain(entity);
  }

  async save(company: Company): Promise<void> {
    const entity = CompanyEntity.fromDomain(company);
    await this.companyModel
      .updateOne({ _id: entity._id }, entity, { upsert: true })
      .exec();
  }

  async findAll(): Promise<Company[]> {
    const results = await this.companyModel.find().exec();

    return results.map(entity => CompanyEntity.toDomain(entity));
  }
}
