import {Args, Int, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {CapabilityTypeDto} from "../../models/domain-objects/capability-type.dto";
import {StaticDataService} from "../../services/static-data.service";
import {CategoryDto} from "../../models/domain-objects/category.dto";

@Resolver(of => CapabilityTypeResolver)
export class CapabilityTypeResolver {

    constructor(private readonly staticDataService: StaticDataService) {
    }

    @Query(returns => [CapabilityTypeDto], {name: 'capabilityType'})
    async getCapabilityTypes(@Args('capabilityTypeIds', {type: () => [Int]}) ids: number[]) {
        return this.staticDataService.generateCapabilityTypesFromJson(ids, false);
    }

    // @ResolveField(() => [CategoryDto], {name:'category'})
    // async getCategory(): Promise<CategoryDto[]> {
    //
    // }
}
