import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { LessonStatus } from '../../entities/lesson.entity';

export class UpdateProgressDto {
  @ApiProperty({ description: 'Lesson status', enum: LessonStatus })
  @IsEnum(LessonStatus)
  status: LessonStatus;

  @ApiProperty({ description: 'Progress percentage (0-100)', required: false })
  @IsNumber()
  @IsOptional()
  progressPercentage?: number;
}
