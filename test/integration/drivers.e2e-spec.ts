import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { dataStore } from '../../src/repositories/data.store.repository';

describe('Drivers (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    dataStore.drivers.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/drivers POST -> create a driver', async () => {
    const res = await request(app.getHttpServer()).post('/drivers').send({ name: 'Tester' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
