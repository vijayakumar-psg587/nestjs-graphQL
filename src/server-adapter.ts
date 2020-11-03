import { Express, Request, Response } from 'express';
import { AppConfigService } from './modules/shared/services/app-config/app-config.service';
import { AppConfigModel } from './modules/shared/models/app-config.model';
import * as bodyParser from 'body-parser';
import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
const rTracer = require('cls-rtracer');

export class ServerAdapter {
    private expressServerInstance: Express.Application;
    constructor() {}

    getCorsConfig() {}
    configMiddlewares(app: INestApplication) {
        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: false }));

        // parse application/json
        app.use(bodyParser.json());

        // parse various different custom JSON types as JSON
        app.use(bodyParser.json({ type: 'application/*+json' }));

        // parse some custom thing into a Buffer
        app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
    }

    configSecurity(app: INestApplication) {
        // TODO: Very dangerous - set the correct contentSecurityPolicy here -DONT disable
        app.use(
            helmet({
                // contentSecurityPolicy: {
                //     directives: {
                //         'default-src': 'self',
                //         'img-src': "'self' data:",
                //         'script-src':"script-src-elem",
                //         'style-src': 'style-src \'self\' https: \'unsafe-inline\''
                //     }
                // },
                contentSecurityPolicy: false,
                hsts: {
                    includeSubDomains: true,
                    maxAge: 50000,
                    preload: true,
                },
            }),
            helmet.frameguard({
                action: 'sameorigin',
            }),
            helmet.xssFilter(),
        );
    }

    // TODO: Add postgre connection for fetching the graphql data
    configureDbConn(app: INestApplication) {}

    configureReqTracer(app: INestApplication) {
        app.use(rTracer.expressMiddleware());
    }

    getServerInstance() {
        return this.expressServerInstance;
    }
}

export const SERVERADAPTER = new ServerAdapter();
