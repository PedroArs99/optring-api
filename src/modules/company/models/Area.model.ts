import { v4 as uuidv4 } from 'uuid';

export class Area {
  readonly id: string;
  readonly name: string;

  private constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static create(name: string): Area {
    return new Area(uuidv4(), name);
  }

  static load(id: string, name: string, contactEmail: string): Area {
    return new Area(
      id,
      name,
    )
  }
}
