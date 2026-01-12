import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post()
  createApplication(@Body() dto: CreateApplicationDto, @Req() req) {
    return this.applicationsService.createApplication(dto, req.user);
  }

  @Get()
  getMyApplications(@Req() req) {
    return this.applicationsService.getMyApplications(req.user.userId);
  }
}
