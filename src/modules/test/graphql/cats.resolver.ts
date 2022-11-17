import { Query, Resolver } from '@nestjs/graphql';
import { CatService } from '../Cat.service';
import { Cat } from './cat.model';

@Resolver(of => Cat)
export class CatsResolver {
  constructor(private readonly catService: CatService) {}

  @Query(returns => [Cat])
  async cats(): Promise<Cat[]> {
    const cats = await this.catService.findAll();
    console.log(cats.toString());
    
    return cats.map(cat => ({
      id: cat._id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
    }));;
  }
}
