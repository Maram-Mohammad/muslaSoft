import { IsIn, MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';
@Entity()
export class NotificationSchedule {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  eventId!: number;

  @Column()
  @MaxLength(500, { message: 'message must be at most 500 characters long' })
  message!: string;

  @Column()
  date!: Date;

  @Column()
  @IsIn(['scheduled', 'sent', 'failed'], { message: 'Invalid status' })
  status!: string;
  
  @ManyToOne(() => Event, (event) => event.notifications)
  event!: Event;}
