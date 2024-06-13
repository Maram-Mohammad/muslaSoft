import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotificationLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  @JoinColumn({ name: 'eventId' })
  eventId!: number;

  @Column()
  message!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
