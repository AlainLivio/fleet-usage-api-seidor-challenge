import { Controller, Post, Body, Get, Param, Put, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto, UpdateDriverDto } from './dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() body: CreateDriverDto) {
    if (!body.name) throw new HttpException('Missing name', HttpStatus.BAD_REQUEST);
    return this.driversService.create(body);
  }

  @Get()
  list(@Query('name') name?: string) {
    return this.driversService.list({ name });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    try {
      return this.driversService.get(id);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateDriverDto) {
    try {
      return this.driversService.update(id, body);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      this.driversService.remove(id);
      return { success: true };
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
