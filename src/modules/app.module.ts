import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { DriversModule } from './drivers/drivers.module';
import { UsagesModule } from './usages/usages.module';

@Module({
  imports: [CarsModule, DriversModule, UsagesModule],
})
export class AppModule {}
