import { HealthCheckEnum } from './enums/health-check.enum';
import { HealthCheckStatusEnum } from './enums/healh-check-status.enum';

export class HealthCheckModel {
    status: HealthCheckEnum;
    color: HealthCheckStatusEnum;
    message?: string;
}
