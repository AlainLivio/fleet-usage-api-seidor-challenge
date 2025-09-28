import { dataStore } from '../../src/repositories/data.store.repository';
import { CarsService } from '../../src/modules/cars/cars.service';
import { DriversService } from '../../src/modules/drivers/drivers.service';
import { UsagesService } from '../../src/modules/usages/usages.service';

describe('UsagesService', () => {
  let cars: CarsService;
  let drivers: DriversService;
  let usages: UsagesService;

  beforeEach(() => {
    dataStore.cars.clear();
    dataStore.drivers.clear();
    dataStore.usages.clear();
    cars = new CarsService();
    drivers = new DriversService();
    usages = new UsagesService();
  });

  it('should create a usage', () => {
    const car = cars.create({ plate: 'AAA-0001', color: 'preto', brand: 'VW' });
    const driver = drivers.create({ name: 'Lucas' });
    const usage = usages.create({
      carId: car.id,
      driverId: driver.id,
      startAt: new Date().toISOString(),
      reason: 'Entrega',
    });
    expect(usage).toHaveProperty('id');
    expect(usage.endAt).toBeNull();
  });

  it('should not allow usage when car already in use', () => {
    const car = cars.create({ plate: 'BBB-0002', color: 'azul', brand: 'Fiat' });
    const d1 = drivers.create({ name: 'Ana' });
    const d2 = drivers.create({ name: 'Paulo' });

    usages.create({ carId: car.id, driverId: d1.id, startAt: new Date().toISOString(), reason: 'x' });
    expect(() =>
      usages.create({ carId: car.id, driverId: d2.id, startAt: new Date().toISOString(), reason: 'y' }),
    ).toThrow('Car already in use');
  });

  it('should not allow usage when driver already using another car', () => {
    const c1 = cars.create({ plate: 'CCC-0003', color: 'preto', brand: 'GM' });
    const c2 = cars.create({ plate: 'DDD-0004', color: 'branco', brand: 'Toyota' });
    const driver = drivers.create({ name: 'Joana' });

    usages.create({ carId: c1.id, driverId: driver.id, startAt: new Date().toISOString(), reason: 'z' });
    expect(() =>
      usages.create({ carId: c2.id, driverId: driver.id, startAt: new Date().toISOString(), reason: 'w' }),
    ).toThrow('Driver already using a car');
  });

  it('should finish a usage', () => {
    const car = cars.create({ plate: 'EEE-0005', color: 'verde', brand: 'Peugeot' });
    const driver = drivers.create({ name: 'Marcelo' });
    const usage = usages.create({ carId: car.id, driverId: driver.id, startAt: new Date().toISOString(), reason: 't' });

    const finished = usages.finish(usage.id, new Date().toISOString());
    expect(finished.endAt).not.toBeNull();
  });

  it('should throw when finishing already finished usage', () => {
    const car = cars.create({ plate: 'FFF-0006', color: 'branco', brand: 'Honda' });
    const driver = drivers.create({ name: 'Clara' });
    const usage = usages.create({ carId: car.id, driverId: driver.id, startAt: new Date().toISOString(), reason: 's' });

    usages.finish(usage.id, new Date().toISOString());
    expect(() => usages.finish(usage.id, new Date().toISOString())).toThrow('Usage already finished');
  });

  it('should throw when finishing non existing usage', () => {
    expect(() => usages.finish('nope', new Date().toISOString())).toThrow('Usage not found');
  });

  it('should list usages with car and driver info', () => {
    const car = cars.create({ plate: 'GGG-0007', color: 'preto', brand: 'Chevrolet' });
    const driver = drivers.create({ name: 'Roberta' });
    usages.create({ carId: car.id, driverId: driver.id, startAt: new Date().toISOString(), reason: 'r' });

    const list = usages.list();
    expect(list[0]).toHaveProperty('car');
    expect(list[0]).toHaveProperty('driver');
    expect(list[0].car.plate).toBe('GGG-0007');
    expect(list[0].driver.name).toBe('Roberta');
  });

  it('should throw error if car not found when creating usage', () => {
    const driver = drivers.create({ name: 'Lucas' });
    expect(() => {
      usages.create({
        carId: 'non existent-car-id',
        driverId: driver.id,
        startAt: new Date().toISOString(),
        reason: 'Teste',
      });
    }).toThrow('Car not found');
  });

  it('should throw error if driver not found when creating usage', () => {
    const car = cars.create({ plate: 'XXX-1234', color: 'azul', brand: 'Ford' });
    expect(() => {
      usages.create({
        carId: car.id,
        driverId: 'non existent-driver-id',
        startAt: new Date().toISOString(),
        reason: 'Teste',
      });
    }).toThrow('Driver not found');
  });

  it('should list usages with car or driver as null if not found', () => {
    const usageId = 'usage-with-missing-car-driver';
    dataStore.usages.set(usageId, {
      id: usageId,
      carId: 'non existent-car-id',
      driverId: 'non existent-driver-id',
      startAt: new Date().toISOString(),
      reason: 'teste',
      endAt: null,
    });

    const list = usages.list();
    const usage = list.find(u => u.id === usageId);

    expect(usage).toBeDefined();
    expect(usage.car).toBeNull();
    expect(usage.driver).toBeNull();

    dataStore.usages.delete(usageId);
  });
});
