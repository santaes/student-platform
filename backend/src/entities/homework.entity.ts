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
import { Lesson } from './lesson.entity';
import { HomeworkAttachment } from './homework-attachment.entity';
import { Submission } from './submission.entity';

export enum HomeworkStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
  GRADED = 'graded',
}

@Entity('homework')
export class Homework {
  @ApiProperty({ description: 'Homework ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Homework title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Homework description' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Due date' })
  @Column({ type: 'datetime' })
  dueDate: Date;

  @ApiProperty({ description: 'Maximum score' })
  @Column({ default: 100 })
  maxScore: number;

  @ApiProperty({ description: 'Homework status', enum: HomeworkStatus })
  @Column({
    type: 'varchar',
    default: HomeworkStatus.PENDING,
  })
  status: HomeworkStatus;

  @ApiProperty({ description: 'Instructor notes' })
  @Column('text', { nullable: true })
  instructorNotes: string;

  @ApiProperty({ description: 'Estimated hours to complete' })
  @Column({ nullable: true })
  estimatedHours: number;

  @ApiProperty({ description: 'Whether the homework is active' })
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Lesson, (lesson) => lesson.homework)
  lesson: Lesson;

  @OneToMany(() => HomeworkAttachment, (attachment) => attachment.homework)
  attachments: HomeworkAttachment[];

  @OneToMany(() => Submission, (submission) => submission.homework)
  submissions: Submission[];
}
