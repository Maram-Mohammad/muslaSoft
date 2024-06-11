import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Event } from './Event';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'eventId' })
  event!: Event;

  @Column()
  attendeesCount!: number;
}
