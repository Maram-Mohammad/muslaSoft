import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './Event';
import { User } from './User';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  attendeesCount!: number;

  @ManyToOne(() => Event, (event) => event.reservations)
  @JoinColumn({ name: 'eventId' })
  event!: Event;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
