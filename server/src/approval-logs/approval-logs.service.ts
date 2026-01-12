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

  async getLogsByApplication(applicationId: number): Promise<ApprovalLog[]> {
    return this.approvalLogRepository.find({
      where: {
        application: { id: applicationId } as any,
      },
      relations: ['actionBy'],
      order: {
        actionAt: 'ASC',
      },
    });
  }
}
