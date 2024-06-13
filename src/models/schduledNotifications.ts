import { IsIn, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotificationSchdule {
  
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(() => Event, (event) => event.)
  // @JoinColumn({ name: 'eventId' })
  eventId!: number;

  @Column()
  @MaxLength(500, { message: 'message must be at most 500 characters long' })
  message!: string;

  @Column()
  date!: Date;

  @Column()
  @IsIn(['scheduled', 'sent', 'failed'], { message: 'Invalid status' })
  status!: string;
}
