import { v4 as uuidv4 } from 'uuid';

export class Company {
  readonly id: string;
  readonly name: string;
  readonly contactEmail: string;

  private constructor(id: string, name: string, contactEmail: string) {
    this.id = id;
    this.name = name;
    this.contactEmail = contactEmail;
  }

  static create(name: string, contactEmail: string): Company {
    return new Company(uuidv4(), name, contactEmail);
  }

  static load(id: string, name: string, contactEmail: string): Company {
    return new Company(
      id,
      name,
      contactEmail
    )
  }
}
