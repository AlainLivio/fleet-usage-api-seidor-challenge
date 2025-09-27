import { dataStore } from '../../src/repositories/data.store.repository';
import { CarsService } from '../../src/modules/cars/cars.service';

describe('CarsService', () => {
  let cars: CarsService;

  beforeEach(() => {
    dataStore.cars.clear();
    cars = new CarsService();
  });

  it('should create a car', () => {
    const car = cars.create({ plate: 'AAA-1111', color: 'preto', brand: 'Fiat' });
    expect(car).toHaveProperty('id');
    expect(dataStore.cars.size).toBe(1);
  });

  it('should get a car by id', () => {
    const car = cars.create({ plate: 'BBB-2222', color: 'azul', brand: 'Ford' });
    expect(cars.get(car.id).plate).toBe('BBB-2222');
  });

  it('should throw when getting a non existing car', () => {
    expect(() => cars.get('nope')).toThrow('Car not found');
  });

  it('should update a car', () => {
    const car = cars.create({ plate: 'CCC-3333', color: 'branco', brand: 'VW' });
    const updated = cars.update(car.id, { color: 'vermelho' });
    expect(updated.color).toBe('vermelho');
  });

  it('should throw when updating non existing car', () => {
    expect(() => cars.update('nope', { color: 'verde' })).toThrow('Car not found');
  });

  it('should delete a car', () => {
    const car = cars.create({ plate: 'DDD-4444', color: 'preto', brand: 'Toyota' });
    cars.remove(car.id);
    expect(dataStore.cars.size).toBe(0);
  });

  it('should throw when deleting non existing car', () => {
    expect(() => cars.remove('nope')).toThrow('Car not found');
  });

  it('should filter cars by color and brand', () => {
    cars.create({ plate: 'EEE-5555', color: 'preto', brand: 'GM' });
    cars.create({ plate: 'FFF-6666', color: 'azul', brand: 'Fiat' });
    expect(cars.list({ color: 'preto' }).length).toBe(1);
    expect(cars.list({ brand: 'Fiat' }).length).toBe(1);
  });
});
