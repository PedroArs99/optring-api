import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './Cat.controller';
import { Cat, CatSchema } from './Cat.entity';
import { CatService } from './Cat.service';
import { CatsResolver } from './graphql/cats.resolver';

@Module({
  controllers: [CatsController],
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [
    CatsResolver,
    CatService
  ],
})
export class TestModule {}
