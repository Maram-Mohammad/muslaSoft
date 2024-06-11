import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './data-source';
import eventRoutes from './routes/eventRoutes';
import reservationRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reservations', reservationRoutes);

// Load Swagger specification
const swaggerDocument = fs.readFileSync(path.resolve(__dirname, 'swagger.yaml'), 'utf8');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)));

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
