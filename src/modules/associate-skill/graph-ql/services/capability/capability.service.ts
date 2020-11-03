import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CapabilityDetail } from '../../models/capability.model';
import { CapabilityTypeDetail } from '../../models/capability-type.model';
import {SubCategoryDetail} from "../../models/sub-category.model";
import {CategoryDetail} from "../../models/category.model";
import {StaticDataService} from "../static-data.service";

@Injectable()
export class CapabilityService {
    private capabilityDetailList: CapabilityDetail[];
    private capabilityTypeDetailList: CapabilityTypeDetail[];
    private subCategoryList: SubCategoryDetail[];
    private categoryList: CategoryDetail[];

    constructor() {
        // need to be replaced with actual DB calls.
        // this.capabilityDetailList = StaticDataService.generateCapabilities();
        // this.categoryList = StaticDataService.generateCategories();
        // this.subCategoryList = StaticDataService.generateSubCategories();
    }

    getCapabilities():CapabilityDetail[] {
        return this.capabilityDetailList;
    }
}
