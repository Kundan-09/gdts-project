import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Application } from '../applications/application.entity';
import { User } from '../users/user.entity';

@Entity('approval_logs')
export class ApprovalLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Application, (application) => application.approvalLogs, {
    onDelete: 'CASCADE',
  })
  application: Application;

  @ManyToOne(() => User)
  actionBy: User;

  @Column()
  previousStatus: string;

  @Column()
  newStatus: string;

  @Column({ nullable: true })
  remark: string;

  @CreateDateColumn()
  actionAt: Date;
}
