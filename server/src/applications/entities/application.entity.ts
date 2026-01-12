import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { ApprovalLog } from '../../approval-logs/approval-log.entity';

@Entity('applications')
export class Application {

  @PrimaryGeneratedColumn({ name: 'application_id' })
  applicationId: number;

  @Column({ name: 'application_type', length: 50 })
  applicationType: string;

  @Column({ name: 'status', length: 50, default: 'SUBMITTED' })
  status: string;

  @Column({ name: 'current_stage', length: 50, default: 'CITIZEN_SUBMITTED' })
  currentStage: string;

  @Column({ name: 'remarks', type: 'text', nullable: true })
  remarks: string;

  @Column({ name: 'delay_reason', type: 'text', nullable: true })
  delayReason: string;

  @Column({ name: 'is_delayed', type: 'tinyint', default: 0 })
  isDelayed: number;

  @Column({
    name: 'submitted_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  submittedDate: Date;

  @Column({
    name: 'last_updated',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  lastUpdated: Date;

  /* ---------------- RELATIONS ---------------- */

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ApprovalLog, (log) => log.application)
  approvalLogs: ApprovalLog[];
}
