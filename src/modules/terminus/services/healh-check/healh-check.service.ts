import { Injectable, Scope } from '@nestjs/common';
import { HealthCheckModel } from 'src/modules/shared/models/healh-check.model';
import { AppUtilService } from 'src/modules/shared/services/app-util/app-util.service';
import { APP_CONST } from 'src/modules/shared/util/app-common-const';
import { Method } from 'axios';
import { HealthCheckStatusEnum } from 'src/modules/shared/models/enums/healh-check-status.enum';
import { HealthCheckEnum } from 'src/modules/shared/models/enums/health-check.enum';

@Injectable({
    scope: Scope.DEFAULT,
})
export class HealhCheckService {
    constructor() {}

    async checkConnection(): Promise<HealthCheckModel> {
        const healthCheckModel = new HealthCheckModel();
        // testing only

        // if axios can be connected to internet and database connection be established, return success
        const axiosInstance = AppUtilService.configureAxios(null, null, null, 'GET');
        try {
            const resp = await axiosInstance.get(APP_CONST.AXIOS.DEFAULT_URL);
            console.log(resp.status);
            if (resp.status <= 304) {
                this.setHealthCheckConfig(healthCheckModel, HealthCheckEnum.SUCCESS, 'Up and Running', HealthCheckStatusEnum.GREEN);
            } else {
                this.setHealthCheckConfig(healthCheckModel, HealthCheckEnum.ERROR, 'Down at the moment', HealthCheckStatusEnum.RED);
            }
        } catch (err) {
            console.log('err in calling service:', err);
            this.setHealthCheckConfig(healthCheckModel, HealthCheckEnum.ERROR, 'Down at the moment', HealthCheckStatusEnum.RED);
        }
        // ellse failure
        return healthCheckModel;
    }

    private setHealthCheckConfig(healthCheckModel: HealthCheckModel, status: HealthCheckEnum, message: string, color: HealthCheckStatusEnum): void {
        healthCheckModel.color = color;
        healthCheckModel.message = message;
        healthCheckModel.status = status;
    }
}
