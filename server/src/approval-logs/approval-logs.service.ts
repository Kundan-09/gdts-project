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

  async createLog(dto: CreateApprovalLogDto) {
  const log = this.approvalLogRepository.create({
    application: { applicationId: dto.applicationId } as any,
    officer: { userId: dto.actionByUserId } as any,
    action: dto.action,
    remarks: dto.remarks,
  });

  return this.approvalLogRepository.save(log);
}

async getLogsByApplication(applicationId: number) {
  return this.approvalLogRepository.find({
    where: {
      application: { applicationId },
    },
    relations: ['officer'],
    order: {
      actionDate: 'ASC',
    },
  });
}
}
