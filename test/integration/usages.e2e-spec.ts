import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { dataStore } from '../../src/repositories/data.store.repository';

describe('Usages (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    dataStore.cars.clear();
    dataStore.drivers.clear();
    dataStore.usages.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/usages POST -> start and finish usage', async () => {
    const carRes = await request(app.getHttpServer()).post('/cars').send({ plate: 'E2E-1', color: 'preto', brand: 'Test' });
    expect(carRes.status).toBe(201);
    const car = carRes.body;

    const driverRes = await request(app.getHttpServer()).post('/drivers').send({ name: 'Tester' });
    expect(driverRes.status).toBe(201);
    const driver = driverRes.body;

    const startRes = await request(app.getHttpServer()).post('/usages').send({
      carId: car.id,
      driverId: driver.id,
      startAt: new Date().toISOString(),
      reason: 'e2e',
    });
    expect(startRes.status).toBe(201);
    const usage = startRes.body;

    const block = await request(app.getHttpServer()).post('/usages').send({
      carId: car.id,
      driverId: driver.id,
      startAt: new Date().toISOString(),
      reason: 'x',
    });
    expect(block.status).toBe(400);

    const finishRes = await request(app.getHttpServer())
      .post(`/usages/${usage.id}/finish`)
      .send({ endAt: new Date().toISOString() });
    expect(finishRes.status).toBe(201);
    expect(finishRes.body.endAt).not.toBeNull();

    const list = await request(app.getHttpServer()).get('/usages');
    expect(list.status).toBe(200);
    expect(list.body.length).toBe(1);
  });
});
