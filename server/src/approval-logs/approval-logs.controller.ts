import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApprovalLogsService } from './approval-logs.service';

@Controller('applications')
export class ApprovalLogsController {
  constructor(
    private readonly approvalLogsService: ApprovalLogsService,
  ) {}
  @Get(':id/approval-logs')
async getApprovalLogs(
  @Param('id', ParseIntPipe) applicationId: number,
) {
  return this.approvalLogsService.getLogsByApplication(applicationId);
}


}
