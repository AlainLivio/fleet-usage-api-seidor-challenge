import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() body: CreateCarDto) {
    if (!body.plate || !body.color || !body.brand) throw new HttpException('Missing fields', HttpStatus.BAD_REQUEST);
    return this.carsService.create(body);
  }

  @Get()
  list(@Query('color') color?: string, @Query('brand') brand?: string) {
    return this.carsService.list({ color, brand });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    try {
      return this.carsService.get(id);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateCarDto) {
    try {
      return this.carsService.update(id, body);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      this.carsService.remove(id);
      return { success: true };
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
