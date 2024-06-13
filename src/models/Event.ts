import { IsIn, IsInt, IsNotEmpty, Max, MaxLength, Min } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationLog } from './NotificationLog';
import { Reservation } from './Reservation';
import { NotificationSchedule } from './schduledNotifications';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message:'Name must be at most 100 characters long' })
  name!: string;

  @Column()
  date!: Date;

  @Column()
  @Min(1, { message: 'Available attendees count must be at least 1' })
  @Max(1000, { message: 'Available attendees count cannot exceed 1000' })
  availableAttendeesCount!: number;

  @Column({ length: 500 })
  @MaxLength(500, { message: 'Description must be at most 500 characters long' })
  description!: string;

  @Column()
  @IsNotEmpty({ message: 'Category is required' })
  @IsIn(['Concert', 'Conference', 'Game'], { message: 'Invalid category' })
  category!: string;

  @OneToMany(() => Reservation, (reservation) => reservation.event)
  reservations!: Reservation[];

  @OneToMany(() => NotificationSchedule, (schedule) => schedule.event)
  notifications!: NotificationSchedule[];

  @OneToMany(() => NotificationLog, (log) => log.event)
  logs!: NotificationLog[];

}
