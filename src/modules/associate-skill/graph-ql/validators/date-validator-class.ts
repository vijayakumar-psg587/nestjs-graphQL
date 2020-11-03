import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {APP_CONST} from "../../../shared/util/app-common-const";
import {AppUtilService} from "../../../shared/services/app-util/app-util.service";
import * as dateFns from 'date-fns';
@ValidatorConstraint({name: 'DateValidator'})
export class DateValidatorClass implements ValidatorConstraintInterface{
    defaultMessage(validationArguments?: ValidationArguments): string {
        return `$value is not a valid date of string with format - ${APP_CONST.COMMON.DEFAULT_DNS_FORMAT}`;
    }

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        return AppUtilService.isNullOrUndefined(value) ? false:
            (dateFns.parseISO(value).toString() === APP_CONST.COMMON.INVALID_DATE) ? false: true;
    }
}