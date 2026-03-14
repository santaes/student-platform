import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../entities/user.entity';
import { StudentProfile } from '../entities/student-profile.entity';
import { Roadmap } from '../entities/roadmap.entity';
import { Module as ModuleEntity } from '../entities/module.entity';
import { Lesson } from '../entities/lesson.entity';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { Homework } from '../entities/homework.entity';
import { HomeworkAttachment } from '../entities/homework-attachment.entity';
import { Submission } from '../entities/submission.entity';
import { Resource } from '../entities/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      StudentProfile,
      Roadmap,
      ModuleEntity,
      Lesson,
      LessonProgress,
      Homework,
      HomeworkAttachment,
      Submission,
      Resource,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class DatabaseModule {}
