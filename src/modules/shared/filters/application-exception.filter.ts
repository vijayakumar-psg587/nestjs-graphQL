import { ExceptionFilter, ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { CustomExceptionModel } from '../models/exceptions/custom-exception.model';

@Catch()
export class ApplicationExceptionHandler implements ExceptionFilter {
    catch(exception: Record<any, unknown>, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse();
        console.log('exception:', exception);
        console.log('response obj fr graphql:');

        response.send(exception);
    }
}
