import { Module } from '@nestjs/common';
import { CapabilityService } from './graph-ql/services/capability/capability.service';
import { TestService } from './graph-ql/services/test/test.service';
import { CapabilityResolver } from './graph-ql/resolvers/associate-skill/capability.resolver';
import { CategoryResolver } from './graph-ql/resolvers/category/category.resolver';
import { SubCategoryResolver } from './graph-ql/resolvers/sub-category/sub-category.resolver';
import {StaticDataService} from "./graph-ql/services/static-data.service";
import {CapabilityTypeResolver} from "./graph-ql/resolvers/capability-type/capability-type.resolver";


@Module({
  providers: [CapabilityService,
    TestService,
    CapabilityResolver,
    CapabilityTypeResolver,
    StaticDataService],
  exports: [StaticDataService]
})
export class AssociateSkillModule {}
