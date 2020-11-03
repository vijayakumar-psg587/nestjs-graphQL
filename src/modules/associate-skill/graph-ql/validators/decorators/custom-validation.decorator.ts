import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import validator from 'validator';
import { AppUtilService } from '../../../../shared/services/app-util/app-util.service';
import * as dateFns from 'date-fns';
import {APP_CONST} from "../../../../shared/util/app-common-const";

export function ModelIdValidatior(property: string, validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'uuidValidation',
            target: object.constructor,
            constraints: [property],
            options: validationOptions,
            propertyName: propertyName,
            validator: {
                validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
                    const [relatedPropertyName] = validationArguments.constraints;
                    const relatedValue = (validationArguments.object as any)[relatedPropertyName];
                    // First check if both the type of value and the typeof property in the obj are same
                    if (value != null && typeof value === 'string' || typeof relatedValue === 'string') {
                        return AppUtilService.isNullOrUndefined(value)
                            ? false
                            : typeof value === 'string'
                            ? validator.isUUID(value, '4')
                            : false;
                    } else {
                        return false;
                    }
                },
            },
        });
    };
}

export function DateValidator(property: string, validationOptions ?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            propertyName: propertyName,
            options: validationOptions,
            name: 'dateValidation',
            target: object.constructor,
            constraints: [property],
            validator: {
                validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
                    const [relatedPropertyName] = validationArguments.constraints;
                    const relatedVal = (validationArguments.value as Date)[relatedPropertyName];
                    if(value != null && typeof value === 'string' || typeof relatedVal === 'string') {
                        return AppUtilService.isNullOrUndefined(value) ? false:
                            (dateFns.parseISO(value).toString() === APP_CONST.COMMON.INVALID_DATE) ? false: true;

                    } else {
                        return false;
                    }
                }
            }
        })
    }
}

export function UserIDValidator(property: string, validationOptions ?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            propertyName: propertyName,
            options: validationOptions,
            name: 'userIdValidation',
            target: object.constructor,
            constraints: [property],
            validator: {
                validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
                    const [relatedPropertyName] = validationArguments.constraints;
                    const relatedVal = (validationArguments.value as Date)[relatedPropertyName];
                    console.log(APP_CONST.COMMON.REGEX.USER_ID.test(value));
                    if(value != null && typeof value === 'string' || typeof relatedVal === 'string') {
                        return value && APP_CONST.COMMON.REGEX.USER_ID.test(value);
                    } else {
                        return false;
                    }
                }
            }
        })
    }
}
