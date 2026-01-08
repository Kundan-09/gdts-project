import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalLog } from './approval-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApprovalLog])],
})
export class ApprovalLogsModule {}
