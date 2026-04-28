import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Application } from '../applications/entities/application.entity';
import { User } from '../users/entities/user.entity';

@Entity('approval_logs')
export class ApprovalLog {
  @PrimaryGeneratedColumn({ name: 'log_id' })
  logId!: number;

  @ManyToOne(() => Application, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application!: Application;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'officer_id' })
  officer!: User;

  @Column({ length: 50, nullable: true })
  action!: string;

  @Column({ type: 'text', nullable: true })
  remarks!: string;

  @CreateDateColumn({ name: 'action_date' })
  actionDate!: Date;
}
