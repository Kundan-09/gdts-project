import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  findAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }
  createApplication(data: Partial<Application>): Promise<Application> {
  const application = this.applicationRepository.create({
    ...data,
    status: 'SUBMITTED',
  });
  return this.applicationRepository.save(application);
}
  async updateStatus(
  application_id: number,
  status: string,
): Promise<Application> {
  const application = await this.applicationRepository.findOne({
    where: { application_id },
  });

  if (!application) {
    throw new Error('Application not found');
  }

  application.status = status;
  return this.applicationRepository.save(application);
}

}
