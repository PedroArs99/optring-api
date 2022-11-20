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

  async save(company: Company): Promise<Company> {
    const entity = CompanyEntity.fromDomain(company);
    let savedEntity = new this.companyModel(entity);
    savedEntity.save();

    return CompanyEntity.toDomain(savedEntity);
  }

  async findAll(): Promise<Company[]> {
    const results = await this.companyModel.find().exec();

    return results.map(entity => CompanyEntity.toDomain(entity));
  }
}
