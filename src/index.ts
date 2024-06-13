import 'reflect-metadata';
import { app } from './app';
import { AppDataSource } from './data-source';
import { NotificationService } from './services/notificationService';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    const notificationService = new NotificationService();
    notificationService.scheduleNotifications();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error during Data Source initialization', error);
  });
