import { Company } from "../../models/Company.model";

export interface CompanyRepository { 
    findAll(): Promise<Company[]>;
    save(company: Company): Promise<Company>;
}