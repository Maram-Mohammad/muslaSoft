import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';
import { User } from './User';

@Entity()
export class NotificationLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  eventId!: number;

  @Column()
  message!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;


  @ManyToOne(() => User, (user) => user.notificationLogs)
  user!: User;

  @ManyToOne(() => Event, (event) => event.logs)
  event!: Event;

}
