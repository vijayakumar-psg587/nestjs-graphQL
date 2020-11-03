import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoryResolver } from './sub-category.resolver';

describe('SubCategoryResolver', () => {
  let resolver: SubCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCategoryResolver],
    }).compile();

    resolver = module.get<SubCategoryResolver>(SubCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
