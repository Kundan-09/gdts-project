import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalLog } from './approval-log.entity';
import { ApprovalLogsService } from './approval-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApprovalLog])],
  providers: [ApprovalLogsService],
})
export class ApprovalLogsModule {}
