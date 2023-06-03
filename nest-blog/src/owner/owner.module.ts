import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner, OwnerSchema } from 'src/schemas/owner.schema';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }])],
  controllers: [OwnerController],
  providers: [OwnerService, ConfigService]
})
export class OwnerModule {}
