import { Controller, Get } from '@nestjs/common';
import { HealhCheckService } from '../../services/healh-check/healh-check.service';
import { HealthCheckModel } from 'src/modules/shared/models/healh-check.model';
import {StaticDataService} from "../../../associate-skill/graph-ql/services/static-data.service";
import {CapabilityDetail} from "../../../associate-skill/graph-ql/models/capability.model";
import {CapabilityDto} from "../../../associate-skill/graph-ql/models/domain-objects/capability.dto";
import {CapabilityTypeDto} from "../../../associate-skill/graph-ql/models/domain-objects/capability-type.dto";
import {SubCategoryDto} from "../../../associate-skill/graph-ql/models/domain-objects/sub-category.dto";

@Controller('health-check')
export class HealhCheckController {
    constructor(private readonly healthCheckService: HealhCheckService,
                private readonly staticDataService: StaticDataService) {}

    @Get('monitor')
    public async monitorApp(): Promise<HealthCheckModel> {
        return await this.healthCheckService.checkConnection();
    }

    @Get('test')
    public async testCapabilities(): Promise<CapabilityTypeDto[]> {
        return await  this.staticDataService.generateCapabilityTypesFromJson([], true);
    }

}
