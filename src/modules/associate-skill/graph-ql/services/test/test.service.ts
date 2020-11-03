import {Injectable, ValidationError} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AppUtilService } from '../../../../shared/services/app-util/app-util.service';
import { plainToClass } from 'class-transformer';
import { CapabilityDetail, CapabilityModel } from '../../models/capability.model';
import {validate} from 'class-validator';
import * as dateFns from 'date-fns';
@Injectable()
export class TestService {
    async testConverter() {
        const plainCapabilityObj = {
            id: uuidv4().toString(),
            name: 'TestCap',
            subCategoryId: uuidv4().toString(),
            updatedAt: AppUtilService.getDefaultTime(),
            updatedBy: 'a634885',
        };

            const obj = plainToClass(CapabilityDetail, plainCapabilityObj, {excludeExtraneousValues: false});
            console.log('obj is:', obj);
            await validate(obj).then(
                err => {
                    console.log('errors:', AppUtilService.validationExceptionFactory(<Array<ValidationError>>err));
                }

            );


    }
}
