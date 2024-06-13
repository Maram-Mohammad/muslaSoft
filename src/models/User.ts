import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationLog } from './NotificationLog';
import { Reservation } from './Reservation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @IsNotEmpty()
  @MaxLength(100, { message: 'Name must be at most 100 characters long' })
  name!: string;

  @Column({ unique: true }) 
  @IsEmail()
  email!: string;

  @Column()
  @MinLength(8)
  password!: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations!: Reservation[];

  @OneToMany(() => NotificationLog, (log) => log.user)
  notificationLogs!: NotificationLog[];
}
