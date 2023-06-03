import { Controller, Get, Render, Post, Req, Body, Redirect, ValidationPipe, UsePipes } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from 'src/dto/create-owner.dto';
import { ConfigRoutersService } from 'src/config/config.routers.service';
import { ConfigService } from 'src/config/config.service';

@Controller('owner')
export class OwnerController {
    constructor(private readonly ownerServices: OwnerService,
                private readonly configServices: ConfigService) {}
    @Get()
    @Render('owner.hbs')
    async root() {
    }

    @Post()
    @Redirect()
    create(@Body() ownerDto : CreateOwnerDto) {
        const results = this.ownerServices.create(ownerDto);   
        return {
            url : this.configServices.siteUrl + '/cats'
        };
    }

    @Post(ConfigRoutersService.API_OWNER_CREATE_ROUTE)
    @UsePipes(new ValidationPipe({ transform: true }))
    createApi(@Body() ownerDto : CreateOwnerDto) {
        const results = this.ownerServices.create(ownerDto);
        return {
            message : 'success'
        }
    }

}
