import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApprovalLog } from '../approval-logs/approval-log.entity';
import {
  ManyToOne,
  OneToMany,

} from 'typeorm';

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

  @OneToMany(() => ApprovalLog, (log) => log.application)
  approvalLogs: ApprovalLog[];

}
