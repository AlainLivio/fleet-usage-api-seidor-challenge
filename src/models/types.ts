export type UUID = string;

export interface Car {
  id: UUID;
  plate: string;
  color: string;
  brand: string;
}

export interface Driver {
  id: UUID;
  name: string;
}

export interface Usage {
  id: UUID;
  carId: UUID;
  driverId: UUID;
  startAt: string;
  endAt?: string | null;
  reason: string;
}
