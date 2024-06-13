import 'reflect-metadata';
import { app } from './app';
import { AppDataSource } from './data-source';
import { NotificationService } from './services/notificationService';
import preloadData from './seeds/preloadData';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async() => {
    const notificationService = new NotificationService();
    notificationService.scheduleNotifications();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    // if (process.env.PRELOAD_DATA === 'true') {
      console.log('Preloading data into the database...');
      await preloadData();
    // }
  
  })
  .catch((error) => {
    console.log('Error during Data Source initialization', error);
  });
