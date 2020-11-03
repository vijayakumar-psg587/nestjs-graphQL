import { HttpException } from '@nestjs/common';

export class CustomExceptionModel implements Error {
    status: number;
    message: string;
    type?: string;
    code: string;
    timestamp: string;
    stack?: string;
    name: string;
}
