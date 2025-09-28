import { Controller, Post, Body, Param, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsagesService } from './usages.service';
import { CreateUsageDto, FinishUsageDto } from './dto';

@Controller('usages')
export class UsagesController {
  constructor(private readonly usagesService: UsagesService) {}

  @Post()
  create(@Body() body: CreateUsageDto) {
    if (!body.carId || !body.driverId || !body.startAt || !body.reason) {
      throw new HttpException('Missing fields', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.usagesService.create(body);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/finish')
  finish(@Param('id') id: string, @Body() body: FinishUsageDto) {
    if (!body.endAt) throw new HttpException('Missing endAt', HttpStatus.BAD_REQUEST);
    try {
      return this.usagesService.finish(id, body.endAt);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  list() {
    return this.usagesService.list();
  }
}
