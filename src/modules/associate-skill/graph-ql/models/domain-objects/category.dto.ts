import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Expose, Type} from "class-transformer";

@ObjectType('categoryDto')
export class CategoryDto {

    @Expose()
    @Field(() => Int, { description:'Category id'})
    id: number;

    @Expose()
    @Field({nullable: true, description: 'Category DTO description'})
    description: string;

    @Expose()
    @Field({description: 'Category DTO  name'})
    name: string;

    @Expose()
    @Field({description: 'User who updated/created Category Dto '})
    updatedAt: string;

    @Expose()
    @Field({description: 'Timestamp of creation of Category DTO'})
    updatedBy: string;

    @Expose()
    @Field(() => Int, {description: 'Linked capabilityType'})
    capabilityTypeId: number;

    @Expose()
    @Field(() => [Int],{description: 'Linked subcategories'})
    subCategoryIds: number[];

    @Expose()
    @Field(() => [Int],{description: 'Linked capabilities'})
    capabilityIds: number[];
}