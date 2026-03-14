import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateHomeworkDto {
  @ApiProperty({ description: 'Homework title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Homework description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Due date' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ description: 'Lesson ID' })
  @IsString()
  lessonId: string;

  @ApiProperty({ description: 'Maximum score', required: false })
  @IsOptional()
  maxScore?: number;

  @ApiProperty({ description: 'Instructor notes', required: false })
  @IsOptional()
  @IsString()
  instructorNotes?: string;
}

export class SubmitHomeworkDto {
  @ApiProperty({ description: 'Text response' })
  @IsString()
  @IsOptional()
  textResponse?: string;
}
