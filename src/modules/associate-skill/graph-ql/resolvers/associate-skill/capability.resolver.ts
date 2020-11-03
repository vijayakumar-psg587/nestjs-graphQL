import {Args, Int, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import { CapabilityDto } from '../../models/domain-objects/capability.dto';
import { CapabilityService } from '../../services/capability/capability.service';
import {StaticDataService} from "../../services/static-data.service";
import {CapabilityDetail} from "../../models/capability.model";
import {type} from "os";
import {SubCategoryDto} from "../../models/domain-objects/sub-category.dto";
import {CategoryDto} from "../../models/domain-objects/category.dto";
import {CapabilityTypeDto} from "../../models/domain-objects/capability-type.dto";

@Resolver(of => CapabilityDto)
export class CapabilityResolver {
    constructor(private readonly capabilityService: CapabilityService,
                    private readonly staticDataService: StaticDataService) {}

    @Query(returns => [CapabilityDto], {name:'capability'})
    async getCapabilities(@Args('capabilityIds',{ type: () => [Int], nullable: true }) ids: number[]): Promise<CapabilityDto[]> {
        return this.staticDataService.generateDomainCapabilitiesFromJson(ids);
    }

    @ResolveField('subCategory', () => SubCategoryDto )
    async getSubCategoryFromCapability(@Parent() capability: CapabilityDto): Promise<SubCategoryDto> {
        console.log('capability in resilverL:', capability);
        return (await this.staticDataService.generateSubCategoriesFromJson([capability.subCategoryId], true))[0];
    }

    @ResolveField('category', () => CategoryDto )
    async getCategoryFromCapability(@Parent() capability: CapabilityDto): Promise<CategoryDto> {
        console.log('capability in resilverL:', capability);
        return (await this.staticDataService.generateCategoriesFromJson([capability.categoryId], true))[0];
    }

    @ResolveField('capabilityType', () => CapabilityTypeDto)
    async getCapabilityTypeFromCapability(@Parent() capability: CapabilityDto): Promise<CapabilityTypeDto> {
        console.log('capability in resilverL:', capability.capabilityTypeId);
        return (await this.staticDataService.generateCapabilityTypesFromJson([capability.capabilityTypeId], true))[0];
    }
}
