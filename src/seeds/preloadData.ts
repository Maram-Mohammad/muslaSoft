import bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { Event } from '../models/Event';
import { NotificationSchedule } from '../models/schduledNotifications';
import { User } from '../models/User';

const preloadData = async () => {

    console.log("HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    try {

        const userRepository = AppDataSource.getRepository(User);
        const eventRepository = AppDataSource.getRepository(Event);
        const notificationScheduleRepository = AppDataSource.getRepository(NotificationSchedule);

        // Preload Users
        const users = [
            {
                name: 'Maryam',
                email: 'Maryam@example.com',
                password: await bcrypt.hash('password123', 10),
            },
            {
                name: 'Wil Smith',
                email: 'Wil@example.com',
                password: await bcrypt.hash('password123', 10),
            },
        ];

        for (const userData of users) {
            const user = userRepository.create(userData);
            await userRepository.save(user);
        }

        // Preload Events
        const events = [
            {
                name: 'Concert A',
                date: new Date('2024-08-15T19:00:00Z'),
                availableAttendeesCount: 100,
                description: 'A great concert',
                category: 'Concert',
            },
            {
                name: 'Conference B',
                date: new Date('2024-09-10T09:00:00Z'),
                availableAttendeesCount: 200,
                description: 'An informative conference',
                category: 'Conference',
            },
        ];

        for (const eventData of events) {
            const event = eventRepository.create(eventData);
            await eventRepository.save(event);
        }

        // Preload Notification Schedules
        const notificationSchedules = [
            {
                eventId: 1,
                message: 'Don’t miss the Concert A!',
                date: new Date('2024-08-15T18:00:00Z'),
                status: 'scheduled',
            },
            {
                eventId: 2,
                message: 'Join us for Conference B!',
                date: new Date('2024-09-10T08:00:00Z'),
                status: 'scheduled',
            },
        ];

        for (const notificationData of notificationSchedules) {
            const notification = notificationScheduleRepository.create(notificationData);
            await notificationScheduleRepository.save(notification);
        }


    } catch (error: any) {
        console.log("error While adding Seed ... ", error);
    }
};

export default preloadData;
