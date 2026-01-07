import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  application_id: number;

  @Column()
  user_id: number;

  @Column()
  application_type: string;

  @Column()
  status: string;

  @Column()
  submitted_date: Date;
}
