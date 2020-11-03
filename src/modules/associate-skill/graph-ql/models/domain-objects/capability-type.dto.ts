import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Expose, Transform} from "class-transformer";
import {CapabilityDto} from "./capability.dto";
import {SubCategoryDto} from "./sub-category.dto";
import {CapabilityDetail} from "../capability.model";
import {CapabilityTypeDetail} from "../capability-type.model";

@ObjectType('capabilityTypeDto')
export class CapabilityTypeDto {

    @Expose()
    @Transform((value, model: CapabilityDetail) => model.id, {toClassOnly: true})
    @Field(() => Int, { description:'Capability type DTO id'})
    id: number;

    @Expose()
    @Transform((value, model: CapabilityDetail) => model.description, {toClassOnly: true})
    @Field({nullable: true, description: 'Capability type DTO description'})
    description?: string;

    @Expose()
    @Transform((value, model: CapabilityTypeDetail) => model.name, {toClassOnly: true})
    @Field({description: 'Capability type DTO  name'})
    name: string;

    @Expose()
    @Transform((value, model: CapabilityTypeDetail) => model.updatedAt, {toClassOnly: true})
    @Field({description: 'User who updated/created Capability type Dto '})
    updatedAt: string;

    @Expose()
    @Transform((value, model: CapabilityTypeDetail) => model.updatedBy, {toClassOnly: true})
    @Field({description: 'Timestamp of creation of Capability type DTO'})
    updatedBy: string;

    @Expose()
    @Field( () => [Int],{description:' List of associated subCategories'})
    subCategoryIds: number[];

    @Expose()
    @Field(() => [Int], {description: 'List of associated categories'})
    categoryIds: number[];

    @Expose()
    @Field(() => [Int], {description: 'List of assocciated capabilities'})
    capabilityIds: number[];
}