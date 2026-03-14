import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ description: 'Full name', required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ description: 'Enrolled program', required: false })
  @IsString()
  @IsOptional()
  enrolledProgram?: string;

  @ApiProperty({ description: 'Current level', required: false })
  @IsNumber()
  @IsOptional()
  currentLevel?: number;

  @ApiProperty({ description: 'Progress percentage', required: false })
  @IsNumber()
  @IsOptional()
  progressPercentage?: number;

  @ApiProperty({ description: 'Upcoming tasks', required: false })
  @IsArray()
  @IsOptional()
  upcomingTasks?: string[];

  @ApiProperty({ description: 'Bio', required: false })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ description: 'Avatar URL', required: false })
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
