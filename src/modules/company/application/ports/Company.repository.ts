import { Company } from "../../models/Company.model";

export interface CompanyRepository { 
    findAll(): Promise<Company[]>;
    findById(id: string): Promise<Company>;
    save(company: Company): Promise<void>;
}