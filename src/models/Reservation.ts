import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Event } from './Event';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Event)
  @JoinColumn()
  event!: Event;
}
