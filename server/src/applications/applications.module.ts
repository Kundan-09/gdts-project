import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Application } from './entities/application.entity';
import { ApprovalLogsModule } from '../approval-logs/approval-logs.module';


@Module({
imports: [
    TypeOrmModule.forFeature([Application]),
    ApprovalLogsModule, 
  ],
  providers: [ApplicationsService],
  controllers: [ApplicationsController],
  exports: [TypeOrmModule], 
})
export class ApplicationsModule {}
