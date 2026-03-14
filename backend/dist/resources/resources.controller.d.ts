import { ResourcesService } from './resources.service';
export declare class ResourcesController {
    private resourcesService;
    constructor(resourcesService: ResourcesService);
    getResources(): Promise<import("../entities/resource.entity").Resource[]>;
    getResourceById(id: string): Promise<import("../entities/resource.entity").Resource>;
    createResource(createResourceDto: any): Promise<import("../entities/resource.entity").Resource[]>;
}
