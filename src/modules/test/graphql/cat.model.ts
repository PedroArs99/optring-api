import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'cat' })
export class Cat {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  breed: string;
}
