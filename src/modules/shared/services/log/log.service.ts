import { Injectable, RequestMethod } from '@nestjs/common';
import { APP_CONST } from '../../util/app-common-const';
import * as pinoHttp from 'pino-http';
const rTracer = require('cls-rtracer');

@Injectable()
export class LogService {
    constructor() {}

    static getLoggerConfig() {
        return {
            pinoHttp: this.getPinoHttpConfig()

        };
    }

    static getPinoHttpConfig() {
        return {
            name: process.env.APP_NAME,
            genReqId: req => {
                return (req.id = rTracer.id());
            },
            serializers: {
                req(req) {
                    req.body = req.raw.body;
                    return req;
                },
            },
            redact: { paths: [...APP_CONST.HEADERS.REDACT, ...APP_CONST.HEADERS.REDACT], censor: APP_CONST.LOGGER.REDACT_VAL },
            level: process.env.APP_LOGGER_LEVEL,
            customLogLevel: (res, err) => {
                if (err) {
                    if (res.statusCode >= 500) {
                        return 'error';
                    } else if (res.statusCode > 304 && res.statusCode < 500) {
                        return 'warn';
                    } else {
                        return 'error';
                    }
                }
                return 'info';
            },
            customSuccessMessage: res => {
                if (res.statusCode <= 304) {
                    return `Request completed - ${res.statusMessage}`;
                } else if (res.err) {
                    return `Request errored with - ${res.err.name} : reason:${res.err.message}`;
                }
            },
            customAttributeKeys: {
                req: `request`,
                res: `response`,
                err: `error`,
                responseTime: `timeTakenForCompletion:ms`,
            },
            prettyPrint: process.env.NODE_ENV !== 'production',
        };
    }
}
