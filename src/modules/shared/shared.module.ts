import { Module } from '@nestjs/common';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { LogService } from './services/log/log.service';

@Module({
    providers: [HeaderInterceptor, LoggerInterceptor, LogService],
    exports: [HeaderInterceptor, LoggerInterceptor],
})
export class SharedModule {}
