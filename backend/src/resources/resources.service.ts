import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async getResources() {
    return this.resourceRepository.find({
      where: { isActive: true },
      order: { category: 'ASC', title: 'ASC' },
    });
  }

  async getResourceById(id: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({
      where: { id: id, isActive: true },
    });

    if (resource) {
      resource.downloadCount += 1;
      await this.resourceRepository.save(resource);
    }

    return resource;
  }

  async createResource(createResourceDto: any) {
    const resource = this.resourceRepository.create({
      ...createResourceDto,
      downloadCount: 0,
    });

    return this.resourceRepository.save(resource);
  }
}
