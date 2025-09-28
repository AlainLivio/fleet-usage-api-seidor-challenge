import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Usage } from '../../models/types';
import { dataStore } from '../../repositories/data.store.repository';
import { CreateUsageDto } from './dto';

@Injectable()
export class UsagesService {
  create(dto: CreateUsageDto): Usage {
    const car = dataStore.cars.get(dto.carId);
    const driver = dataStore.drivers.get(dto.driverId);
    if (!car) throw new Error('Car not found');
    if (!driver) throw new Error('Driver not found');

    for (const usage of dataStore.usages.values()) {
      if (usage.carId === dto.carId && !usage.endAt) throw new Error('Car already in use');
      if (usage.driverId === dto.driverId && !usage.endAt) throw new Error('Driver already using a car');
    }

    const usage: Usage = { id: uuid(), carId: dto.carId, driverId: dto.driverId, startAt: dto.startAt, reason: dto.reason, endAt: null };
    dataStore.usages.set(usage.id, usage);
    return usage;
  }

  finish(id: string, endAt: string): Usage {
    const usage = dataStore.usages.get(id);
    if (!usage) throw new Error('Usage not found');
    if (usage.endAt) throw new Error('Usage already finished');
    usage.endAt = endAt;
    dataStore.usages.set(id, usage);
    return usage;
  }

  list() {
    const usageList: Array<any> = [];
    for (const usage of dataStore.usages.values()) {
      const car = dataStore.cars.get(usage.carId) ?? null;
      const driver = dataStore.drivers.get(usage.driverId) ?? null;
      usageList.push({ ...usage, car, driver });
    }
    return usageList;
  }
}
