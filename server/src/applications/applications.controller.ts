import { Controller, Get } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Body, Post } from '@nestjs/common';
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  getAllApplications() {
    return this.applicationsService.findAll();
  }
  

  @Post()
  createApplication(@Body() body: any) {
    return this.applicationsService.createApplication(body);
  }

}
