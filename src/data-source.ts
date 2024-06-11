import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Event } from './models/Event';
import { Reservation } from './models/Reservation';
import { User } from './models/User';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,  // Disable synchronize here
  logging: false,
  entities: [User, Event, Reservation],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    await AppDataSource.dropDatabase();  // Drop the existing database schema
    await AppDataSource.synchronize();   // Synchronize the new schema
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
