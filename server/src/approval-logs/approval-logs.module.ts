import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalLog } from './approval-log.entity';
import { ApprovalLogsService } from './approval-logs.service';
import { ApprovalLogsController } from './approval-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApprovalLog])],
  providers: [ApprovalLogsService],
  controllers: [ApprovalLogsController],
})
export class ApprovalLogsModule {}
