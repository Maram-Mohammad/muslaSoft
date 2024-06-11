import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column()
  date!: Date;

  @Column()
  availableAttendeesCount!: number;

  @Column({ length: 500 })
  description!: string;

  @Column()
  category!: string;
}
