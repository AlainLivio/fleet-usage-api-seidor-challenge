import { Module } from '@nestjs/common';
import { UsagesController } from './usages.controller';
import { UsagesService } from './usages.service';
import { CarsModule } from '../cars/cars.module';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [CarsModule, DriversModule],
  controllers: [UsagesController],
  providers: [UsagesService],
})
export class UsagesModule {}
