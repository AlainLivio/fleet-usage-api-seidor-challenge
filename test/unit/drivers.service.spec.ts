import { dataStore } from '../../src/repositories/data.store.repository';
import { DriversService } from '../../src/modules/drivers/drivers.service';

describe('DriversService', () => {
  let drivers: DriversService;

  beforeEach(() => {
    dataStore.drivers.clear();
    drivers = new DriversService();
  });

  it('should create a driver', () => {
    const d = drivers.create({ name: 'Driver A' });
    expect(d.name).toBe('Driver A');
  });

  it('should get a driver by id', () => {
    const d = drivers.create({ name: 'Driver B' });
    expect(drivers.get(d.id).name).toBe('Driver B');
  });

  it('should throw when getting non existing driver', () => {
    expect(() => drivers.get('nope')).toThrow('Driver not found');
  });

  it('should update a driver', () => {
    const d = drivers.create({ name: 'Driver' });
    const updated = drivers.update(d.id, { name: 'Driver C' });
    expect(updated.name).toBe('Driver C');
  });

  it('should throw when updating non existing driver', () => {
    expect(() => drivers.update('nope', { name: 'Driver Fake' })).toThrow('Driver not found');
  });

  it('should delete a driver', () => {
    const d = drivers.create({ name: 'Driver D' });
    drivers.remove(d.id);
    expect(dataStore.drivers.size).toBe(0);
  });

  it('should throw when deleting non existing driver', () => {
    expect(() => drivers.remove('nope')).toThrow('Driver not found');
  });

  it('should filter drivers by partial name', () => {
    drivers.create({ name: 'João' });
    drivers.create({ name: 'Maria' });
    expect(drivers.list({ name: 'Jo' }).length).toBe(1);
    expect(drivers.list({ name: 'Ma' }).length).toBe(1);
  });
});
