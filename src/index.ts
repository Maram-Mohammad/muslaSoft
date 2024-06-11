import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './data-source';
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';

import authRoutes from './routes/authRoutes';
import ticketRoutes from './routes/ticketRoutes';
import YAML from 'yamljs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);


// Load Swagger specification
const swaggerDocument = YAML.load(path.join(__dirname, '..', 'event-booking-swagger.yml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
