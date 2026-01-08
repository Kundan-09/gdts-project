import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param 
} from '@nestjs/common';

import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // READ all applications
  @Get()
  getAllApplications() {
    return this.applicationsService.findAll();
  }

  // CREATE new application
  @Post()
  createApplication(@Body() body: any) {
    return this.applicationsService.createApplication(body);
  }

  // UPDATE application status (Officer action)
  @Put(':id/status')
  updateApplicationStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ) {
    return this.applicationsService.updateStatus(Number(id), status);
  }
}
