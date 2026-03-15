import { Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
export declare class ResourcesService {
    private resourceRepository;
    constructor(resourceRepository: Repository<Resource>);
    getResources(): Promise<Resource[]>;
    getResourceById(id: string): Promise<Resource>;
    createResource(createResourceDto: any): Promise<Resource[]>;
}
