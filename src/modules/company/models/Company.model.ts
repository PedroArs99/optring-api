import { v4 as uuidv4 } from 'uuid';
import { Area } from './Area.model';

export class Company {
  readonly id: string;
  readonly name: string;
  readonly contactEmail: string;
  readonly areas: Area[];

  private constructor(
    id: string,
    name: string,
    contactEmail: string,
    areas: Area[],
  ) {
    this.id = id;
    this.name = name;
    this.contactEmail = contactEmail;
    this.areas = areas;
  }

  registerNewArea(name: string) {
    const area = Area.create(name);

    return new Company(this.id, this.name, this.contactEmail, [
      ...this.areas,
      area,
    ]);
  }

  static create(name: string, contactEmail: string): Company {
    return new Company(uuidv4(), name, contactEmail, []);
  }

  static load(
    id: string,
    name: string,
    contactEmail: string,
    areas: Area[],
  ): Company {
    return new Company(id, name, contactEmail, areas);
  }
}
