import { Controller, Get, Param, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { HomeworkService } from './homework.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubmitHomeworkDto } from './dto/submit-homework.dto';
import { HomeworkStatus } from '../entities/homework.entity';

@ApiTags('Homework')
@Controller('homework')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class HomeworkController {
  constructor(private homeworkService: HomeworkService) {}

  @Get()
  @ApiOperation({ summary: 'Get homework list' })
  @ApiResponse({ status: 200, description: 'Homework list retrieved successfully' })
  async getHomework(
    @Request() req,
    @Query('status') status?: HomeworkStatus
  ) {
    return this.homeworkService.getHomework(req.user.id, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get homework details' })
  @ApiResponse({ status: 200, description: 'Homework details retrieved successfully' })
  async getHomeworkById(@Param('id') id: number) {
    return this.homeworkService.getHomeworkById(id);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit homework' })
  @ApiResponse({ status: 201, description: 'Homework submitted successfully' })
  async submitHomework(
    @Param('id') id: number,
    @Body() submitHomeworkDto: SubmitHomeworkDto,
    @Request() req
  ) {
    return this.homeworkService.submitHomework(req.user.id, id, submitHomeworkDto);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Mark homework as completed' })
  @ApiResponse({ status: 200, description: 'Homework marked as completed' })
  async markAsCompleted(@Param('id') id: number, @Request() req) {
    return this.homeworkService.markHomeworkCompleted(req.user.id, id);
  }
}
