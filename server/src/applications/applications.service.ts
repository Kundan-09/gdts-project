import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApprovalLogsService } from '../approval-logs/approval-logs.service';

import { User } from '../users/entities/user.entity';


@Injectable()
export class ApplicationsService {
  constructor(
  @InjectRepository(Application)
  private readonly applicationRepo: Repository<Application>,
  private readonly approvalLogsService: ApprovalLogsService,
) {}

  async createApplication(dto: CreateApplicationDto, user: User) {
    const application = this.applicationRepo.create({
      applicationType: dto.applicationType,
      status: 'SUBMITTED',
      currentStage: 'CITIZEN_SUBMITTED',
      user: { userId: user.userId },
    });

    return this.applicationRepo.save(application);
  }

  async getMyApplications(userId: number) {
    return this.applicationRepo.find({
      where: { user: { userId: userId } },
      order: { submittedDate: 'DESC' },
    });
  }
  async updateApplicationStatus(
  applicationId: number,
  newStatus: string,
  actionBy: User,
  remark?: string,
) {
  const application = await this.applicationRepo.findOne({
    where: { applicationId },
  });

  if (!application) {
    throw new Error('Application not found');
  }

  const previousStatus = application.status;

  // 1️⃣ Update application
  application.status = newStatus;
  application.currentStage = newStatus;
  application.remarks = remark ?? null;

  const updatedApplication = await this.applicationRepo.save(application);

  // 2️⃣ Create approval log
  await this.approvalLogsService.createLog({
    applicationId: application.applicationId,
    actionByUserId: actionBy.userId,
    previousStatus,
    newStatus,
    remark,
  });

  return updatedApplication;
}

}
