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
import { Homework } from './homework.entity';

export enum SubmissionStatus {
  SUBMITTED = 'submitted',
  GRADED = 'graded',
  RETURNED = 'returned',
}

@Entity('submissions')
@Unique(['student', 'homework'])
export class Submission {
  @ApiProperty({ description: 'Submission ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Text response' })
  @Column('text', { nullable: true })
  textResponse: string;

  @ApiProperty({ description: 'Score received' })
  @Column({ nullable: true })
  score: number;

  @ApiProperty({ description: 'Submission status', enum: SubmissionStatus })
  @Column({
    type: 'varchar',
    default: SubmissionStatus.SUBMITTED,
  })
  status: SubmissionStatus;

  @ApiProperty({ description: 'Instructor feedback' })
  @Column('text', { nullable: true })
  instructorFeedback: string;

  @ApiProperty({ description: 'Submitted at' })
  @Column({ type: 'datetime' })
  submittedAt: Date;

  @ApiProperty({ description: 'Graded at' })
  @Column({ type: 'datetime', nullable: true })
  gradedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.submissions)
  student: User;

  @ManyToOne(() => Homework, (homework) => homework.submissions)
  homework: Homework;
}
