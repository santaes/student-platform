import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';
import { LessonStatus } from './lesson.entity';

@Entity('lesson_progress')
@Unique(['student', 'lesson'])
export class LessonProgress {
  @ApiProperty({ description: 'Progress ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Progress status', enum: LessonStatus })
  @Column({
    type: 'varchar',
    default: LessonStatus.LOCKED,
  })
  status: LessonStatus;

  @ApiProperty({ description: 'Progress percentage' })
  @Column({ default: 0 })
  progressPercentage: number;

  @ApiProperty({ description: 'Time spent in minutes' })
  @Column({ default: 0 })
  timeSpentMinutes: number;

  @ApiProperty({ description: 'Started date' })
  @Column({ nullable: true })
  startedAt: Date;

  @ApiProperty({ description: 'Completed date' })
  @Column({ nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.lessonProgress)
  student: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonProgress)
  lesson: Lesson;
}
