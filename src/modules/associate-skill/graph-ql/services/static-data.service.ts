import { CapabilityDetail } from '../models/capability.model';
import * as fs from 'fs';
import * as path from 'path';
import { plainToClass } from 'class-transformer';
import { CapabilityDto } from '../models/domain-objects/capability.dto';
import { Injectable, Scope } from '@nestjs/common';
import { SubCategoryDto } from '../models/domain-objects/sub-category.dto';
import { CapabilityTypeDto } from '../models/domain-objects/capability-type.dto';
import { CategoryDto } from '../models/domain-objects/category.dto';

@Injectable({
    scope: Scope.DEFAULT,
})
export class StaticDataService {
    async generateDomainCapabilitiesFromJson(ids: number[]): Promise<CapabilityDto[]> {
        const fileData = fs.readFileSync(path.join(process.cwd(), './src/assets/local/capabilities.json'));
        const capabilityDetails: CapabilityDetail[] = JSON.parse(fileData.toString());
        if (!ids || ids.length === 0) {
            return this.convertCapabilityToDomainModel(capabilityDetails);
        } else {
            return this.convertCapabilityToDomainModel(
                capabilityDetails.filter(capability => {
                    return ids.includes(capability.id);
                }),
            );
        }
    }

    async generateSubCategoriesFromJson(ids: number[], isCallFromCapability: boolean = false): Promise<SubCategoryDto[]> {
        const fileData = fs.readFileSync(path.join(process.cwd(), './src/assets/local/subCategories.json'));
        const subCategories: SubCategoryDto[] = JSON.parse(fileData.toString());
        const capabilitiesFromJSON: CapabilityDto[] = await this.generateDomainCapabilitiesFromJson(null);

        // populate the capabilities
        if (isCallFromCapability) {
           // comes preloaded with category , so it doesnt need to be populated again
            // populate capabilities
            subCategories.map(subCategory => {
                const capability = new CapabilityDto();

                subCategory.capabilities = capabilitiesFromJSON.filter(capability => capability.subCategoryId === subCategory.id);
                subCategory.capabilityIds = subCategory.capabilities.map(item => item.id);
                // populate capability types

                // subCategory.capabilityType = (subCategory.capabilities.map(capability => capability.capabilityType) as [CapabilityTypeDto])[0];
                return subCategory;
            });
        }

        if (!ids || ids.length === 0) {
            return subCategories;
        } else {
            return subCategories.filter(subCategory => ids.includes(subCategory.id));
        }
    }

    async generateCategoriesFromJson(ids: number[], isCallFromCapability: boolean = false, isCallFromCapabilityType: boolean = false): Promise<CategoryDto[]> {
        const fileData = fs.readFileSync(path.join(process.cwd(), './src/assets/local/categories.json'));
        let categories: CategoryDto[] = JSON.parse(fileData.toString());
        const capabilitiesFromJSON: CapabilityDto[] = await this.generateDomainCapabilitiesFromJson(null);

        if (isCallFromCapability) {
             categories = categories.filter(category => {
                return capabilitiesFromJSON
                    .map(capability => {
                        return capability.categoryId;
                    })
                    .includes(category.id);
            });
        } else if (isCallFromCapabilityType) {
            // from the capabilities retrived from DB, get all subCategories
            // and from tjat get the categories
            const capabilitiesFromJSON = await this.generateDomainCapabilitiesFromJson(null);
            capabilitiesFromJSON.filter(capability => {
                return ids.includes(capability.capabilityTypeId);
            });
        }
        if (!ids || ids.length === 0) {
            return categories;
        } else {
            return categories.filter(category => ids.includes(category.id));
        }
    }

    async generateCapabilityTypesFromJson(ids: number[], isCallFromCapability: boolean = false): Promise<CapabilityTypeDto[]> {
        // TODO: Get data from DB
        const fileData = fs.readFileSync(path.join(process.cwd(), './src/assets/local/capabilityTypes.json'));
        let capabilityTypes: CapabilityTypeDto[] = JSON.parse(fileData.toString());

        const capabilitiesFromJSON:CapabilityDto[] = await this.generateDomainCapabilitiesFromJson(null);
        // populate the respective ids.
        capabilityTypes.forEach(capType => {
            const subCatIds: number[] = [];
            const categoryIds: number[] = [];
            const capabilityIds: number[] = [];
            capabilitiesFromJSON.forEach(capability => {
                if(capability.capabilityTypeId === capType.id) {
                    subCatIds.push(capability.subCategoryId);
                    categoryIds.push(capability.categoryId);
                    capabilityIds.push(capability.id);
                }
            });
            capType.capabilityIds = Array.from(new Set(capabilityIds));
            capType.categoryIds = Array.from(new Set(categoryIds));
            capType.subCategoryIds = Array.from(new Set(subCatIds));
        });

        if (isCallFromCapability) {
            capabilityTypes = capabilityTypes.filter(capType => {
                const cpaList: number[] = capabilitiesFromJSON.map(capability => capability.capabilityTypeId);
                return cpaList.includes(capType.id);
            });
        }

        if (!ids || ids.length === 0) {
            return capabilityTypes;
        } else {
            return capabilityTypes.filter(capabilityType => ids.includes(capabilityType.id));
        }
    }

    //TODO: replace with proper class-transformer method
    convertCapabilityToDomainModel(capabilities: CapabilityDetail[]): CapabilityDto[] {
        // const capabilitiesDTO: CapabilityDto[] = plainToClass(CapabilityDto, capabilities);
        const capabilitiesDTO: CapabilityDto[] = new Array();

        capabilities.map((capability, index) => {
            // const capabilityDto = capabilitiesDTO[index];
            const capabilityDto = new CapabilityDto();
            capabilityDto.id = capability.id;
            capabilityDto.name = capability.name;
            capabilityDto.description = capability.description;
            capabilityDto.updatedAt = capability.updatedAt;
            capabilityDto.updatedBy = capability.updatedBy;
            capabilityDto.capabilityTypeId = capability.capabilityType.id;
            capabilityDto.subCategoryId = capability.subCategoryId;
            capabilityDto.categoryId = capability.subCategory.category.id;
            // capabilityDto.capabilityType = plainToClass(CapabilityTypeDto, capability.capabilityType);
            capabilitiesDTO.push(capabilityDto);
        });
        return capabilitiesDTO;
    }
}
