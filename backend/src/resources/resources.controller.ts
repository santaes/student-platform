import { Controller, Get, Param, Post, Body, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { join } from 'path';
import { Response } from 'express';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({ status: 200, description: 'Resources retrieved successfully' })
  async getResources() {
    return this.resourcesService.getResources();
  }

  @Get('download/:filename')
  @ApiOperation({ summary: 'Download file by filename' })
  @ApiResponse({ status: 200, description: 'File downloaded successfully' })
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      // Use the static assets path
      const filePath = join(__dirname, '..', 'public', 'resources', filename);
      console.log('Attempting to download file:', filePath);
      
      // Check if file exists
      const fs = require('fs');
      if (!fs.existsSync(filePath)) {
        console.log('File not found:', filePath);
        return res.status(404).json({ message: 'File not found' });
      }
      
      return res.download(filePath, filename);
    } catch (error) {
      console.error('Error downloading file:', error);
      return res.status(500).json({ message: 'Error downloading file' });
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get resource by ID' })
  @ApiResponse({ status: 200, description: 'Resource retrieved successfully' })
  async getResourceById(@Param('id') id: string) {
    return this.resourcesService.getResourceById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new resource' })
  @ApiResponse({ status: 201, description: 'Resource created successfully' })
  async createResource(@Body() createResourceDto: any) {
    return this.resourcesService.createResource(createResourceDto);
  }
}
