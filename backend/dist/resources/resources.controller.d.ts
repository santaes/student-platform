import { ResourcesService } from './resources.service';
import { Response } from 'express';
export declare class ResourcesController {
    private resourcesService;
    constructor(resourcesService: ResourcesService);
    getResources(): Promise<import("../entities/resource.entity").Resource[]>;
    downloadFile(filename: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
    getResourceById(id: number): Promise<import("../entities/resource.entity").Resource>;
    createResource(createResourceDto: any): Promise<import("../entities/resource.entity").Resource[]>;
}
