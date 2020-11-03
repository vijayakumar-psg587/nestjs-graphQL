import { Test, TestingModule } from '@nestjs/testing';
import { HealhCheckController } from './healh-check.controller';

describe('HealhCheckController', () => {
  let controller: HealhCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealhCheckController],
    }).compile();

    controller = module.get<HealhCheckController>(HealhCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
