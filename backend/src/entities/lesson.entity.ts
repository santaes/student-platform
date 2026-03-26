import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Module } from './module.entity';
import { LessonProgress } from './lesson-progress.entity';
import { Homework } from './homework.entity';

export enum LessonStatus {
  LOCKED = 'locked',
  AVAILABLE = 'available',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('lessons')
export class Lesson {
  @ApiProperty({ description: 'Lesson ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Lesson title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Lesson description' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Lesson content' })
  @Column('text', { nullable: true })
  content: string;

  @ApiProperty({ description: 'Lesson order in module' })
  @Column({ default: 0 })
  order: number;

  @ApiProperty({ description: 'Estimated completion time in hours' })
  @Column({ default: 1 })
  estimatedHours: number;

  @ApiProperty({ description: 'Lesson status', enum: LessonStatus })
  @Column({
    type: 'varchar',
    default: LessonStatus.LOCKED,
  })
  status: LessonStatus;

  @ApiProperty({ description: 'Is lesson active' })
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Module, (module) => module.lessons)
  module: Module;

  @OneToMany(() => LessonProgress, (progress) => progress.lesson)
  lessonProgress: LessonProgress[];

  @OneToMany(() => Homework, (homework) => homework.lesson)
  homework: Homework[];
}
