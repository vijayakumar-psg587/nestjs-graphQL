import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { CapabilityDto } from './capability.dto';
import { CapabilityTypeDto } from './capability-type.dto';
import {CategoryDto} from "./category.dto";

@ObjectType('subCategoryDto')
export class SubCategoryDto {
    @Field(() => Int, { description: 'SubCategoryDTO id' })
    id: number;

    @Field({ nullable: true, description: 'SubCategory DTO description' })
    description: string;

    @Field({ description: 'SubCategory DTO  name' })
    name: string;

    @Field({ description: 'User who updated/created SubCategory Dto ' })
    updatedAt: string;

    @Field({ description: 'Timestamp of creation of SubCategory DTO' })
    updatedBy: string;

    @Field({ description: 'Linked categoryDTO Id' })
    categoryId: number;

    @Field(() => Int, { description: 'Linked capabilityType' })
    capabilityTypeId: number;

    @Field(() => [Int], { description: 'Linked capabilities' })
    capabilityIds: number[];

    @Field(() => [CapabilityDto])
    capabilities: CapabilityDto[];

    @Field(() => CapabilityTypeDto)
    capabilityType: CapabilityTypeDto;


}
