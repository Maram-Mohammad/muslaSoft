import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './Reservation';
import { NotificationLog } from './NotificationLog';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @IsNotEmpty()
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
