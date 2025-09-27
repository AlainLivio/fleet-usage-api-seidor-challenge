import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from '../../models/types';
import { dataStore } from '../../repositories/data.store.repository';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  create(dto: CreateCarDto): Car {
    const car: Car = { id: uuid(), plate: dto.plate, color: dto.color, brand: dto.brand };
    dataStore.cars.set(car.id, car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto): Car {
    const existing = dataStore.cars.get(id);
    if (!existing) throw new Error('Car not found');
    const updated = { ...existing, ...updateCarDto };
    dataStore.cars.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    if (!dataStore.cars.has(id)) throw new Error('Car not found');
    dataStore.cars.delete(id);
  }

  get(id: string): Car {
    const car = dataStore.cars.get(id);
    if (!car) throw new Error('Car not found');
    return car;
  }

  list(filter?: { color?: string; brand?: string }): Car[] {
    const carsList = Array.from(dataStore.cars.values());
    return carsList.filter(car => {
      if (filter?.color && car.color !== filter.color) return false;
      if (filter?.brand && car.brand !== filter.brand) return false;
      return true;
    });
  }
}
