import { Get, Controller, Render } from '@nestjs/common';
import { NestPackerService } from './nestpacker/nestpacker.service';
import { ConfigRoutersService } from './config/config.routers.service';

@Controller()
export class AppController extends NestPackerService {
  constructor() {
    super();
  }
  @Get()
  @Render('index.hbs')
  root() {
    this.set_localize('nestConfigs', {
      API_OWNER_CREATE_URL : this.getPathComponentUrl(ConfigRoutersService.API_OWNER_CREATE_AJAX_ROUTE)
    }, true);
    return { 
      ...this.pack(),
      meta_title : 'Trang chủ'
    };
  }
}