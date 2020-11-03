import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { Request } from 'express';
import { APP_CONST } from '../util/app-common-const';
import { AppUtilService } from '../services/app-util/app-util.service';
import validator from 'validator';
import { UserIdType } from '../models/enums/user-id-type.enum';
import { PrincipalRoleType } from '../models/enums/principal-role-type.enum';

@Injectable()
export class HeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req: Request = context.switchToHttp().getRequest();
        const whitelistedURLS =  APP_CONST.HEADERS.WHITELIST_HEADER_URLS.filter(item => req.url.includes(item))
        if(!AppUtilService.checkIfNull(whitelistedURLS)) {
            const mandatoryHeaderList = Object.keys(req.headers).filter(headerKey => APP_CONST.HEADERS.MANDATORY_HEADERS_NAME_LIST.includes(headerKey.toUpperCase()));
            if (mandatoryHeaderList.length > 0 && mandatoryHeaderList.length === APP_CONST.HEADERS.MANDATORY_HEADERS_NAME_LIST.length) {
                // it means that we have all the mandatory headers
                // now check the values
                this.validateHeaders(mandatoryHeaderList, req);
            } else {
                // TODO: replace with pino logs
                return throwError(AppUtilService.createCustomException('FID-HEADER', 'Required headers are missing'));
            }
        }


        return next.handle();
    }

    private validateHeaders(headerList: string[], req: Request) {
        let errMessage = '';
        let headerVal = '';
        headerList.forEach(item => {
            headerVal = req.headers[item] as string;
            if (item.includes('TRACKING'.toLowerCase()) && !validator.isUUID(headerVal, '4')) {
                // then throw err
                errMessage = errMessage + `Header - ${item} of val ${headerVal} is not a valid uuid \n`;
            } else if (item.includes('USER-TYPE'.toLowerCase()) && !UserIdType[headerVal]) {
                errMessage =
                    errMessage +
                    `Header - ${item} of val ${headerVal} is not a valid UserIdType.
                      ValidHeaders are ${Object.keys(UserIdType)} \n`;
            } else if (item.includes('PRINCIPAL'.toLowerCase()) && !PrincipalRoleType[headerVal]) {
                errMessage =
                    errMessage +
                    `Header - ${item} of val ${headerVal} is not a valid PrincipalRoleType.
                      ValidHeaders are ${Object.keys(PrincipalRoleType)} \n`;
            } else if (item.includes('PROCESS'.toLowerCase()) && !validator.isUUID(headerVal.substr(3, headerVal.length - 1), '4')) {
                errMessage = errMessage + `Header - ${item} of val ${headerVal} doesn't contain a valid UUID \n`;
            }
        });

        if (errMessage != null && errMessage.length > 0) {
            // TODO: replace with pino logs
            console.log('inside header interceptor:', errMessage);
            throw AppUtilService.createCustomException('FID-HEADER', errMessage);
        }
    }
}
