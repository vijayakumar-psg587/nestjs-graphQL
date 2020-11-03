import { HttpStatus, Injectable, Scope, ValidationError } from '@nestjs/common';
import * as dateFns from 'date-fns';
import { APP_CONST } from '../../util/app-common-const';
import * as axios from 'axios';
import * as os from 'os';
import { AppConfigService } from '../app-config/app-config.service';
import { CustomExceptionBuilder } from '../../models/builders/exception/custom-exception.builder';
import { CustomExceptionModel } from '../../models/exceptions/custom-exception.model';

@Injectable({
    scope: Scope.DEFAULT,
})
export class AppUtilService {
    static isNullOrUndefined(obj: Record<string, unknown> | string | undefined): boolean {
        if (obj === undefined) {
            return true;
        } else {
            // this is string coleasing in node 14. Please refer
            return obj === null ?? false;
        }
    }

    static checkIfNull(obj: {} | string | [] | undefined): Record<string, unknown> | string | number | null {
        if (obj === undefined) {
            return null;
        } else {
            // this is string coleasing in node 14. Please refer
            return obj ?? null;
        }
    }

    static getDefaultTime(): string {
        return dateFns.format(Date.now(), APP_CONST.COMMON.DEFAULT_DNS_FORMAT);
    }

    static configureAxios(headers: Map<string, string>, data: Record<string, unknown> | string, params: Record<string, unknown>, method: axios.Method): axios.AxiosInstance {
        const axiosConfig = AppConfigService.getAppAxiosConfig();
        const axiosInstance = axios.default.create({
            method: method,
            headers: headers,
            decompress: axiosConfig.isDecompress,
            maxBodyLength: axiosConfig.maxBodyLength,
            maxContentLength: axiosConfig.maxContentLength,
            maxRedirects: axiosConfig.maxRedirects,
            xsrfCookieName: axiosConfig.xsrfCookie,
            xsrfHeaderName: axiosConfig.xsrfHeader,
            params: params ?? null,
            data: data ?? null,
            timeout: axiosConfig.timeout,
        });

        axiosInstance.interceptors.request.use(
            (config: axios.AxiosRequestConfig) => {
                // Alywas add app name as header for any outbound req
                const appNameHeader = AppConfigService.getAppConfig().name;
                config.headers = { APP_NAME: appNameHeader };
                return config;
            },
            err => {
                return Promise.reject(err);
            },
        );
        return axiosInstance;
    }

    static getLoggerConfig() {}

    static validationExceptionFactory(errors: ValidationError[]) {

        const err = new Error();
        err.name = APP_CONST.ERROR.TYPE.VALIDATION;

        let errString = `${APP_CONST.ERROR.MESSAGES.VALIDATION_ERROR}`;
        let errReason = 'Violating constraints';
        errors.forEach(errorItem => {
            if (errString.length === 0) {
                errString = AppUtilService.createErrorStringsForValidaionError(errString, errorItem);
                errReason = AppUtilService.createErrorReasonForValidationError(errorItem);
            } else {
                errString = errString + AppUtilService.createErrorStringsForValidaionError(errString, errorItem);
                errReason = errReason + AppUtilService.createErrorReasonForValidationError(errorItem);
            }
        });
        err.message = errString + errReason;
        throw AppUtilService.createCustomException(HttpStatus.BAD_REQUEST.toString(), err.message, err.name);
    }

    /**
     * method to list different parameters and their concerned property tested
     * with the incorrect value passed
     * @param errString
     * @param errorItem
     */
    static createErrorStringsForValidaionError(errString: string, errorItem) {
        return (
            ` : 
                \{${errorItem.target.constructor.name} - with property: "${errorItem.property}" - Value provided: "${errorItem.value}\},"`
        );
    }

    /**
     * Method to split the different constraints and join them back seperated by \r\n
     * so they can be readily consumed as is in all HTML clients
     * @param errorItem
     */
    static createErrorReasonForValidationError(errorItem) {
        return `: 
             ${JSON.stringify(errorItem.constraints)
            .split(',')
            .join(os.EOL)}`;
    }

    static createCustomException(code: string, reason: string, name?: string): CustomExceptionModel {
        const errModelBuilder = new CustomExceptionBuilder();
        errModelBuilder
            .setCode(code)
            .setMessage(reason)
            .setTimestamp()
            .setName(name);
        if (!AppUtilService.checkIfNull(code) && (code.includes('DB') || code.includes('REQUEST') || code.includes('CUSTOM'))) {
            errModelBuilder.setStatus(500);
        } else if ((!AppUtilService.checkIfNull(code) && code.includes('HEADER')) || code.includes('VALIDATION')) {
            errModelBuilder.setStatus(400);
        }
        return errModelBuilder.build();
    }
}
