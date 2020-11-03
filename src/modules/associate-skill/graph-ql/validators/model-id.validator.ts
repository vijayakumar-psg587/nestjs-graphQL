import { ValidationArguments, Validator, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import validator from 'validator';

import { AppUtilService } from '../../../shared/services/app-util/app-util.service';
@ValidatorConstraint({ async: true, name: 'IdValidator' })
export class ModelIdValidator implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string {
        console.log('validation arguments:', validationArguments);
        return `${validationArguments.value} is not a proper UUID`;
    }

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        console.log('model id value:', value);
        return AppUtilService.isNullOrUndefined(value) ? Promise.reject(`Id : ${value} is empty or undefined`) :
            (typeof value === 'string' ? validator.isUUID(value, '4') : Promise.reject(`Id: ${value} is not a valid UUID`));
    }
}
