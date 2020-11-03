import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { SERVERADAPTER } from './server-adapter';
import { AppConfigService } from './modules/shared/services/app-config/app-config.service';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_CONST } from './modules/shared/util/app-common-const';
import { SharedModule } from './modules/shared/shared.module';
import { HeaderInterceptor } from './modules/shared/interceptors/header.interceptor';
import { LoggerInterceptor } from './modules/shared/interceptors/logger.interceptor';
import { ApplicationExceptionHandler } from './modules/shared/filters/application-exception.filter';
import {AppUtilService} from "./modules/shared/services/app-util/app-util.service";

let app: INestApplication;
(async function bootstrap() {
    const appConfigModel = AppConfigService.getAppConfig();
    const serverAdapter = new ExpressAdapter(SERVERADAPTER.getServerInstance());
    try {
        app = await NestFactory.create<NestExpressApplication>(AppModule, serverAdapter);
    } catch (error) {
        process.stderr.write(`Cannot create nestjs app adapter: ${error}`);
        process.kill(process.pid, 'SIGTERM');
    }
    const HeaderInterceptorInstance = app.select(SharedModule).get(HeaderInterceptor, { strict: true });
    const LoggerInterceptorInstance = app.select(SharedModule).get(LoggerInterceptor, { strict: true });

    // Enable cors
    app.enableCors({
        origin: APP_CONST.CORS.ACCESS_CONTROL_ALLOW_ORIGIN,
        methods: APP_CONST.CORS.ACCESS_CONTROL_ALLOW_METHODS,
        credentials: true,
        allowedHeaders: APP_CONST.CORS.ACCESS_CONTROL_ALLOW_HEADERS,
    });

    // Enable middlewares
    SERVERADAPTER.configMiddlewares(app);

    // Configure security
    SERVERADAPTER.configSecurity(app);

    // Configure request rtracer
    SERVERADAPTER.configureReqTracer(app);

    // Configure db
    SERVERADAPTER.configureDbConn(app);

    // app.useGlobalInterceptors(HeaderInterceptorInstance, LoggerInterceptorInstance);

    app.useGlobalFilters(new ApplicationExceptionHandler());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
                transformOptions: {
                    strategy:"excludeAll",
                },
            validationError: {
                target: true,
                value: true,
            },
            errorHttpStatusCode: HttpStatus.BAD_REQUEST,
            forbidUnknownValues: true,
            forbidNonWhitelisted: true,
            exceptionFactory: errors => {
                AppUtilService.validationExceptionFactory(errors);
            }

        }),
    );

    app.setGlobalPrefix(appConfigModel.context + appConfigModel.version);
    try {
        await app.listen(appConfigModel.port, appConfigModel.host);
    } catch (err) {
        console.log(err);
        process.stderr.write(`Error in starting the app: ${err}`);
        process.kill(process.pid, 'SIGTERM');
    }
})();

// Code for graceful shutdown
process.on('SIGTERM', async () => {
    try {
        await app.close();
    } catch (err) {
        process.stdout.write(`Error closing the app  - ${err}`);
        process.exit(1);
    }
    process.stdout.write('App is closed because of a SIGTERM event');
    process.exit(1);
});

// TODO: use Promise.all syntax to wrap aroud the await calls (more than one) await that
// and catch the exception , instead of listening to this rejection event
process.on('unhandledRejection', function(errThrown) {
    // this is a stream
    process.stderr.write('unhandled err thrown:' + JSON.stringify(errThrown));
    process.exit(1);
});
