import {Expose, Type} from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { UpdatableInterface } from './interface/updatable.interface';
import { DateValidator, ModelIdValidatior, UserIDValidator } from '../validators/decorators/custom-validation.decorator';
import { APP_CONST } from '../../../shared/util/app-common-const';
import {Field, ID, Int, ObjectType} from "@nestjs/graphql";
import {CapabilityTypeDetail} from "./capability-type.model";
import {SubCategoryDto} from "./domain-objects/sub-category.dto";
import {SubCategoryDetail} from "./sub-category.model";

export class CapabilityModel {
    // this expose needs to be modified  with the right name of the entity from database
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
    description: string;

    @Expose()
    @IsNotEmpty()
    subCategoryId: number;

    @Expose()
    @IsNotEmpty()
    @Type(() => CapabilityTypeDetail)
    capabilityType: CapabilityTypeDetail;
}

export class CapabilityDetail extends CapabilityModel implements UpdatableInterface {
    @Expose()
    @DateValidator('updatedAt', {
        message: `Value: $value should be of format - ${APP_CONST.COMMON.DEFAULT_DNS_FORMAT}`,
    })
    updatedAt: string;

    @Expose()
    @IsNotEmpty()
    subCategory: SubCategoryDetail;

    @Expose()
    @IsNotEmpty()
    @UserIDValidator('', {
        message: 'Value: $value is not a proper LDAP',
    })
    updatedBy: string;
}
