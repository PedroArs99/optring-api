import { Body, Controller, Get, Post } from "@nestjs/common";
import { Cat } from "./Cat.entity";
import { CatService } from "./Cat.service";
import { CreateCatDto } from "./CreateCatDto.model";

@Controller("/cats")
export class CatsController {
    constructor(private catService: CatService){}

    @Get()
    async getAllCats(): Promise<Cat[]> {
        return this.catService.findAll();
    }

    @Post()
    async createCat(@Body() commandDto: CreateCatDto): Promise<Cat>{
        return this.catService.create(commandDto);
    }
}