import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalLog } from './approval-log.entity';

@Injectable()
export class ApprovalLogsService {
  constructor(
    @InjectRepository(ApprovalLog)
    private readonly approvalLogRepository: Repository<ApprovalLog>,
  ) {}
 async createLog(
  applicationId: number,
  actionById: number,
  previousStatus: string,
  newStatus: string,
  remark?: string,
): Promise<ApprovalLog> {
  const log = this.approvalLogRepository.create({
    application: { id: applicationId } as any,
    actionBy: { id: actionById } as any,
    previousStatus,
    newStatus,
    remark,
  });

  return this.approvalLogRepository.save(log);
}


}
