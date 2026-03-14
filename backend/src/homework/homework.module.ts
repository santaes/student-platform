import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { Homework } from '../entities/homework.entity';
import { HomeworkAttachment } from '../entities/homework-attachment.entity';
import { Submission } from '../entities/submission.entity';
import { Lesson } from '../entities/lesson.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Homework, HomeworkAttachment, Submission, Lesson, User])],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports: [HomeworkService],
})
export class HomeworkModule {}
