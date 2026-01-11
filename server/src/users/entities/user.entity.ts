import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Application } from '../../applications/entities/application.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'email', length: 100, unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role', length: 50 })
  role: string; // CITIZEN | OFFICER | ADMIN

  /* ---------------- RELATION ---------------- */

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
