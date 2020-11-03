import { Test, TestingModule } from '@nestjs/testing';
import { HealhCheckService } from './healh-check.service';

describe('HealhCheckService', () => {
  let service: HealhCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealhCheckService],
    }).compile();

    service = module.get<HealhCheckService>(HealhCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
