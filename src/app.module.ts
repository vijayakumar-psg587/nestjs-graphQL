import { Module, RequestMethod } from '@nestjs/common';
import { TerminusModule } from './modules/terminus/terminus.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { HealhCheckController } from './modules/terminus/controllers/healh-check/healh-check.controller';
const rTracer = require('cls-rtracer');
import { GraphQLModule } from '@nestjs/graphql';
import { AssociateSkillModule } from './modules/associate-skill/associate-skill.module';
import { LogService } from './modules/shared/services/log/log.service';
import { AppConfigService } from './modules/shared/services/app-config/app-config.service';

@Module({
    imports: [
        TerminusModule,
        SharedModule,
        AuthModule,
        DatabaseModule,
        LoggerModule.forRoot({
            pinoHttp: LogService.getPinoHttpConfig(),
            forRoutes: [HealhCheckController],
            exclude: [{ method: RequestMethod.GET, path: '/health-check/testPino' }],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: 'associate-skill-schema.gql',
            playground: process.env.NODE_ENV !== 'production',
            path: AppConfigService.getAppConfig().context + AppConfigService.getAppConfig().graphQLPath,
            // cors: {
            //     origin: APP_CONST.CORS.ACCESS_CONTROL_ALLOW_ORIGIN,
            //     methods: APP_CONST.CORS.ACCESS_CONTROL_ALLOW_METHODS,
            //     credentials: true,
            //     allowedHeaders: APP_CONST.CORS.ACCESS_CONTROL_ALLOW_HEADERS,
            // },
            // mockEntireSchema: false,
        }),
        AssociateSkillModule,
    ],
})
export class AppModule {}
