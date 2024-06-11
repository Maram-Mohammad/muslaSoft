import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { AppDataSource } from './data-source';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'event-booking-swagger.yml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
  .then(() => {
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/events', ticketRoutes);
    app.use('/events', eventRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error during Data Source initialization', error);
  });
