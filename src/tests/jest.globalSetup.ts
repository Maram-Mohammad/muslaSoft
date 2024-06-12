import { execSync } from 'child_process';
import dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../../.env.test');
dotenv.config({ path: envPath });
module.exports = async () => {
  const dbName = process.env.DB_NAME;
  execSync(`PGPASSWORD=${process.env.DB_PASSWORD} createdb -h ${process.env.DB_HOST} -U ${process.env.DB_USERNAME} ${dbName}`);
};
