import * as dotenv from 'dotenv';
import * as path from 'path';
import { AppDataSource } from '../data-source';
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

beforeAll(async () => {
  const dbName = process.env.DB_NAME;
  AppDataSource.setOptions({
    database: dbName
  });
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});
