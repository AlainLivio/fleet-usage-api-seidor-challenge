import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Driver } from '../../models/types';
import { dataStore } from '../../repositories/data.store.repository';
import { CreateDriverDto, UpdateDriverDto } from './dto';

@Injectable()
export class DriversService {
  create(dto: CreateDriverDto): Driver {
    const driver: Driver = { id: uuid(), name: dto.name };
    dataStore.drivers.set(driver.id, driver);
    return driver;
  }

  update(id: string, updateDriverDto: UpdateDriverDto): Driver {
    const existing = dataStore.drivers.get(id);
    if (!existing) throw new Error('Driver not found');
    const updated = { ...existing, ...updateDriverDto };
    dataStore.drivers.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    if (!dataStore.drivers.has(id)) throw new Error('Driver not found');
    dataStore.drivers.delete(id);
  }

  get(id: string): Driver {
    const driver = dataStore.drivers.get(id);
    if (!driver) throw new Error('Driver not found');
    return driver;
  }

  list(filter?: { name?: string }): Driver[] {
    const driversList = Array.from(dataStore.drivers.values());
    return driversList.filter(d => {
      if (filter?.name && !d.name.includes(filter.name)) return false;
      return true;
    });
  }
}
