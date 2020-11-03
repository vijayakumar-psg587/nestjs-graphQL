import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityResolver } from './capability.resolver';

describe('CapabilityResolver', () => {
  let resolver: CapabilityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapabilityResolver],
    }).compile();

    resolver = module.get<CapabilityResolver>(CapabilityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
