import {Expose, Type} from 'class-transformer';
import { DateValidator, ModelIdValidatior, UserIDValidator } from '../validators/decorators/custom-validation.decorator';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { UpdatableInterface } from './interface/updatable.interface';
import { APP_CONST } from '../../../shared/util/app-common-const';
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {CategoryDetail} from "./category.model";

export class SubCategoryModel {
    @Expose()
    @IsNotEmpty()
    id: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 50, {
        message: 'Length of the val:$value should be greater than $constraint1 & less than $constraint2',
    })
    name: string;

    @Expose()
    @IsOptional()
    @IsString()
    @Length(2, 50, {
        message: 'Length of the val:$value should be greater than $constraint1 & less than $constraint2',
    })
    description?: string;

    @Expose()
    @IsNotEmpty()
    categoryId: number;
}

export class SubCategoryDetail extends SubCategoryModel implements UpdatableInterface {
    @Expose()
    @DateValidator('updatedAt', {
        message: `Value: $value should be of format - ${APP_CONST.COMMON.DEFAULT_DNS_FORMAT}`,
    })
    updatedAt: string;

    @Expose()
    @IsNotEmpty()
    @Type(() => CategoryDetail)
    category: CategoryDetail;

    @Expose()
    @IsNotEmpty()
    @UserIDValidator('', {
        message: 'Value: $value is not a proper LDAP',
    })
    updatedBy: string;
}
