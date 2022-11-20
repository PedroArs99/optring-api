export class Company {
  readonly id: string;
  readonly name: string;
  readonly contactEmail: string;

  constructor(name: string, contactEmail: string) {
    this.id = 'NCY';
    this.name = name;
    this.contactEmail = contactEmail;
  }
}
