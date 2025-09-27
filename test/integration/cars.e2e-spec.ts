import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { dataStore } from '../../src/repositories/data.store.repository';

describe('Cars (e2e)', () => {
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
  });

  afterAll(async () => {
    await app.close();
  });

  it('/cars POST -> create a car', async () => {
    const res = await request(app.getHttpServer()).post('/cars').send({ plate: 'E2E-1', color: 'preto', brand: 'Test' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
