import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalLog } from './approval-log.entity';
import { CreateApprovalLogDto } from './dto/create-approval-log.dto';

@Injectable()
export class ApprovalLogsService {
  constructor(
    @InjectRepository(ApprovalLog)
    private readonly approvalLogRepository: Repository<ApprovalLog>,
  ) {}

  async createLog(dto: CreateApprovalLogDto): Promise<ApprovalLog> {
    const log: Partial<ApprovalLog> = {
      application: { applicationId: dto.applicationId } as any,
      actionBy: { userId: dto.actionByUserId } as any,
      previousStatus: dto.previousStatus,
      newStatus: dto.newStatus,
      remark: dto.remark ?? undefined,
    };

    const createdLog = this.approvalLogRepository.create(log);
    return this.approvalLogRepository.save(createdLog);
  }

  async getLogsByApplication(applicationId: number): Promise<ApprovalLog[]> {
    return this.approvalLogRepository.find({
      where: {
        application: { applicationId } as any,
      },
      relations: ['actionBy'],
      order: {
        actionAt: 'ASC',
      },
    });
  }
}
