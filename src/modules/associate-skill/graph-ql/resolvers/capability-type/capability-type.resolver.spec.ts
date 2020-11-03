import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityTypeResolver } from './capability-type.resolver';

describe('CapabilityTypeResolver', () => {
  let resolver: CapabilityTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapabilityTypeResolver],
    }).compile();

    resolver = module.get<CapabilityTypeResolver>(CapabilityTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
