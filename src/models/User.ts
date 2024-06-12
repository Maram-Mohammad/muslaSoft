import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './Reservation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true }) 
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations!: Reservation[];
}
