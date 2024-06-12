import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import reservationRoutes from './routes/reservationRoutes';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'event-booking-swagger.yml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/events', ticketRoutes);
app.use('/events', eventRoutes);
app.use('/reservations', reservationRoutes);

export { app };
