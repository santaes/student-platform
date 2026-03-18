import { Controller, Get, Param, Post, Body, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { join } from 'path';
import { Response } from 'express';

@ApiTags('Resources')
@Controller('resources')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({ status: 200, description: 'Resources retrieved successfully' })
  async getResources() {
    return this.resourcesService.getResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get resource by ID' })
  @ApiResponse({ status: 200, description: 'Resource retrieved successfully' })
  async getResourceById(@Param('id') id: string) {
    return this.resourcesService.getResourceById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new resource' })
  @ApiResponse({ status: 201, description: 'Resource created successfully' })
  async createResource(@Body() createResourceDto: any) {
    return this.resourcesService.createResource(createResourceDto);
  }

  @Get('download/:filename')
  @ApiOperation({ summary: 'Download file by filename' })
  @ApiResponse({ status: 200, description: 'File downloaded successfully' })
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'public', 'resources', filename);
    return res.download(filePath, filename);
  }
}
