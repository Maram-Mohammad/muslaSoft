import dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Event } from './models/Event';
import { NotificationLog } from './models/NotificationLog';
import { Reservation } from './models/Reservation';
import { User } from './models/User';

// dotenv.config();
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Event, Reservation, NotificationLog],
  migrations: [],
  subscribers: [],
});
