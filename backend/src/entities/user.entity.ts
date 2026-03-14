import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { StudentProfile } from './student-profile.entity';
import { LessonProgress } from './lesson-progress.entity';
import { Submission } from './submission.entity';

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @ApiProperty({ description: 'User ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Hashed password' })
  @Column()
  password: string;

  @ApiProperty({ description: 'User role', enum: UserRole })
  @Column({
    type: 'varchar',
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @ApiProperty({ description: 'Is user active' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'User creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'User last update date' })
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => StudentProfile, (profile) => profile.user)
  studentProfile: StudentProfile;

  @OneToMany(() => LessonProgress, (progress) => progress.student)
  lessonProgress: LessonProgress[];

  @OneToMany(() => Submission, (submission) => submission.student)
  submissions: Submission[];
}
