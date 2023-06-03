import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnerModule } from './owner/owner.module';
import { NestPackerService } from './nestpacker/nestpacker.service';
import { ConfigRoutersService } from './config/config.routers.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
          const options: MongooseModuleOptions = {
            uri: configService.mongoUri,
            useNewUrlParser: true,
            useUnifiedTopology: true
          };

        /*if (configService.mongoAuthEnabled) {
          options.user = configService.mongoUser;
          options.pass = configService.mongoPassword;
          options.dbName = configService.mongoDB;
        }*/

        return options;
      },
      inject: [ConfigService],
    }),
    CatsModule,
    OwnerModule,
    ConfigModule    
  ],
  controllers: [AppController],
  providers: [AppService, ConfigRoutersService, NestPackerService],
})
export class AppModule {}