import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Area } from '../../models/Area.model';

@ObjectType({ description: 'area' })
export class AreaDto {
  @Field(_ => ID)
  id: string;

  @Field()
  name: string;

  static fromDomain(area: Area): AreaDto {
    return {
      id: area.id,
      name: area.name,
    }
  }
}
