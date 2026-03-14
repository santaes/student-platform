import { Controller, Get, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoadmapService } from './roadmap.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProgressDto } from './dto/update-progress.dto';

@ApiTags('Roadmap')
@Controller('roadmap')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RoadmapController {
  constructor(private roadmapService: RoadmapService) {}

  @Get()
  @ApiOperation({ summary: 'Get user roadmap' })
  @ApiResponse({ status: 200, description: 'Roadmap retrieved successfully' })
  async getRoadmap(@Request() req) {
    return this.roadmapService.getRoadmap(req.user.id);
  }

  @Get('modules/:roadmapId')
  @ApiOperation({ summary: 'Get roadmap modules' })
  @ApiResponse({ status: 200, description: 'Modules retrieved successfully' })
  async getModules(@Param('roadmapId') roadmapId: string) {
    return this.roadmapService.getModules(roadmapId);
  }

  @Get('lessons/:moduleId')
  @ApiOperation({ summary: 'Get module lessons' })
  @ApiResponse({ status: 200, description: 'Lessons retrieved successfully' })
  async getLessons(@Param('moduleId') moduleId: string) {
    return this.roadmapService.getLessons(moduleId);
  }

  @Get('lesson/:lessonId')
  @ApiOperation({ summary: 'Get lesson details' })
  @ApiResponse({ status: 200, description: 'Lesson details retrieved successfully' })
  async getLessonDetails(@Param('lessonId') lessonId: string) {
    return this.roadmapService.getLessonDetails(lessonId);
  }

  @Post('lesson/:lessonId/progress')
  @ApiOperation({ summary: 'Update lesson progress' })
  @ApiResponse({ status: 200, description: 'Lesson progress updated successfully' })
  async updateProgress(
    @Param('lessonId') lessonId: string,
    @Body() updateProgressDto: UpdateProgressDto,
    @Request() req
  ) {
    return this.roadmapService.updateLessonProgress(
      req.user.id,
      lessonId,
      updateProgressDto.status,
      updateProgressDto.progressPercentage
    );
  }
}
