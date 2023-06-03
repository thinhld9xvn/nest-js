import { Controller, Get, Render } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from 'src/dto/create-cat.dto';
import mongoose from 'mongoose';
import { Cat } from 'src/schemas/cat.schema';
@Controller('cats')
export class CatsController {
    constructor(private readonly catServices: CatsService) {}
    @Get()
    @Render("cat.hbs")
    async root() {
        //const resultsDeleted = await this.catServices.deleteAll();
        /*const data : CreateCatDto = {
            name : 'Mèo Tam Thể',
            age : 10,
            breed: 'tam thể'
        };
        let resultsCreated = await this.catServices.create(data); 
        (await this.catServices.findAll()).map(async (item : Cat) => {
            return await this.catServices.delete(item._id.toHexString());
        });
        //const resultsDeleted = await this.catServices.delete('64292e9770a751133845915b');
        //const resultsDeleted = await this.catServices.delete(new mongoose.Types.ObjectId("64292ee179166df7e6480d39").toHexString());
        resultsCreated = await this.catServices.create(data); 
        //console.log(resultsCreated);*/
        return {
            cats : [...await this.catServices.findAll()]
        }
    }
}
