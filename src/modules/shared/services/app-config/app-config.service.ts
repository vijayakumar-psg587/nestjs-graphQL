import { Injectable, Scope } from '@nestjs/common';
import { AppConfigModel } from '../../models/app-config.model';
import { AppConfigAxiosModel } from '../../models/app-axios-config.model';
import { AppUtilService } from '../app-util/app-util.service';
import { APP_CONST } from '../../util/app-common-const';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable({
    scope: Scope.DEFAULT,
})
export class AppConfigService {
    static staticLogger:PinoLogger;
    constructor(private readonly logger: PinoLogger) {
        this.logger.setContext(AppConfigService.name);
        AppConfigService.staticLogger = this.logger;
    }


    static getAppConfig = (): AppConfigModel => {
        const appConfigModel = new AppConfigModel();
        appConfigModel.port = +process.env.APP_PORT;
        appConfigModel.host = process.env.APP_HOST;
        appConfigModel.context = process.env.APP_CONTEXT;
        appConfigModel.name = process.env.APP_NAME;
        appConfigModel.version = process.env.APP_VERSION;
        appConfigModel.graphQLPath=process.env.APP_GRAPHQL_PATH;
        return appConfigModel;
    };

    static getAppAxiosConfig = (): AppConfigAxiosModel => {
        const axiosConfig = new AppConfigAxiosModel();
        const { APP_AXIOS_XSRF_COOKIE_TOKEN, APP_AXIOS_XSRF_HEADER_TOKEN, APP_AXIOS_WITH_CRED_BOOL } = process.env;
        const { APP_AXIOS_MAX_CONTENT_LENGTH, APP_AXIOS_MAX_BODY_LENGTH, APP_AXIOS_MAX_REDIRECTS, APP_AXIOS_DECOMPRESS_BOOL } = process.env;

        axiosConfig.isDecompress = !!(AppUtilService.checkIfNull(APP_AXIOS_DECOMPRESS_BOOL) ?? APP_CONST.AXIOS.DEFAULT_DECOMPRESS_BOOL);
        axiosConfig.maxBodyLength = +(AppUtilService.checkIfNull(APP_AXIOS_MAX_BODY_LENGTH) ?? APP_CONST.AXIOS.DEFAULT_BODY_LENGTH);
        axiosConfig.maxContentLength = +(AppUtilService.checkIfNull(APP_AXIOS_MAX_CONTENT_LENGTH) ?? APP_CONST.AXIOS.DEFAULT_CONTENT_LENGTH);
        axiosConfig.maxRedirects = +(AppUtilService.checkIfNull(APP_AXIOS_MAX_REDIRECTS) ?? APP_CONST.AXIOS.DEFAULT_REDIRECTS);
        axiosConfig.shouldAllowCred = !!(AppUtilService.checkIfNull(APP_AXIOS_WITH_CRED_BOOL) ?? APP_CONST.AXIOS.DEFAULT_WTIH_CRED_BOOL);
        axiosConfig.xsrfCookie = <string>(AppUtilService.checkIfNull(APP_AXIOS_XSRF_COOKIE_TOKEN) ?? APP_CONST.AXIOS.DEFAULT_XSRF_HEADER_COOKIE);
        axiosConfig.xsrfHeader = <string>(AppUtilService.checkIfNull(APP_AXIOS_XSRF_HEADER_TOKEN) ?? APP_CONST.AXIOS.DEFAULT_XSRF_HEADER_TOKEN);
        axiosConfig.timeout = +AppUtilService.checkIfNull(process.env.APP_AXIOS_TIMEOUT) ?? APP_CONST.AXIOS.DEFAULT_TIMEOUT;

        return axiosConfig;
    };
}
