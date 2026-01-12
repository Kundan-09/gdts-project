import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
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
}
