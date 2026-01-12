import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalLogsController } from './approval-logs.controller';

describe('ApprovalLogsController', () => {
  let controller: ApprovalLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalLogsController],
    }).compile();

    controller = module.get<ApprovalLogsController>(ApprovalLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
