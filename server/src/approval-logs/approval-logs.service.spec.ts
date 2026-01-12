import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalLogsService } from './approval-logs.service';

describe('ApprovalLogsService', () => {
  let service: ApprovalLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalLogsService],
    }).compile();

    service = module.get<ApprovalLogsService>(ApprovalLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
