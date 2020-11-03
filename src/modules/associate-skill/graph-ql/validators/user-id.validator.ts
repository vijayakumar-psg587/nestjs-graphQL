import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {APP_CONST} from "../../../shared/util/app-common-const";

@ValidatorConstraint({name: 'UserIdValidator'})
export class UserIdValidator implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string {
        return `$value is not of a proper format - ${APP_CONST.COMMON.REGEX.USER_ID}`;
    }

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        return value && APP_CONST.COMMON.REGEX.USER_ID.test(value);
    }

}