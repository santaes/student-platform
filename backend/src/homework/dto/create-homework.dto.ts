import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsOptional()
  @IsString()
  instructorNotes?: string;

  @IsOptional()
  @IsString()
  estimatedHours?: string;
}
