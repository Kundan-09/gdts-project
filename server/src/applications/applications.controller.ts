import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post()
  createApplication(@Body() body: CreateApplicationDto) {
    const dummyUser = { id: 1 } as any; // TEMPORARY
    return this.applicationsService.createApplication(body, dummyUser);
  }

  @Get()
  getMyApplications() {
    const dummyUserId = 1; // TEMPORARY
    return this.applicationsService.getMyApplications(dummyUserId);
  }
}
