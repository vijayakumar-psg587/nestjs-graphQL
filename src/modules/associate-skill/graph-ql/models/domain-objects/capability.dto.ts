import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Expose, Transform, Type} from "class-transformer";
import {SubCategoryDto} from "./sub-category.dto";
import {CapabilityTypeDto} from "./capability-type.dto";
import {CategoryDto} from "./category.dto";
import {CapabilityDetail} from "../capability.model";


@ObjectType('capabilityDto')
export class CapabilityDto {
    @Expose()
    @Transform((value, model: CapabilityDetail) => model.id, {toClassOnly: true})
    @Field(() => Int, { description:'Capability DTO id'})
    id: number;

    @Expose()
    @Transform((value, model: CapabilityDetail) => model.description, {toClassOnly: true})
    @Field({nullable: true, description: 'Capability DTO description'})
    description ?: string;

    @Expose()
    @Transform((value, model: CapabilityDetail) => model.name, {toClassOnly: true})
    @Field({description: 'Capability DTO name'})
    name: string;

    @Expose()
    @Transform((value, model: CapabilityDetail) => model.updatedAt, {toClassOnly: true})
    @Field({description: 'User who updated/created Capability Dto '})
    updatedAt: string;

    @Expose()
    @Transform((value, model: CapabilityDetail) => model.updatedBy, {toClassOnly: true})
    @Field({description: 'Timestamp of creation of capability DTO'})
    updatedBy: string;

    @Expose()
    @Transform((value, model: CapabilityDetail) => model.subCategoryId, {toClassOnly: true})
    @Field(() => Int,{description: 'Linked subcategory'})
    subCategoryId: number;


    @Field(() => Int, {description: 'Linked capabilityType'})
    capabilityTypeId: number;

    @Field(() => Int, {description: 'Linked category'})
    categoryId: number;

    @Field(() => SubCategoryDto)
    subCategory: SubCategoryDto;

    @Field(() => CategoryDto)
    category: CategoryDto;

    @Field(() => CapabilityTypeDto)
    capabilityType: CapabilityTypeDto;

}
