import { Car, Driver, Usage } from '../models/types';

export const dataStore = {
  cars: new Map<string, Car>(),
  drivers: new Map<string, Driver>(),
  usages: new Map<string, Usage>(),
};
