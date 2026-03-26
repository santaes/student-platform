import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('student_profiles')
export class StudentProfile {
  @ApiProperty({ description: 'Student profile ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Full name' })
  @Column()
  fullName: string;

  @ApiProperty({ description: 'Enrolled learning program' })
  @Column()
  enrolledProgram: string;

  @ApiProperty({ description: 'Current learning level' })
  @Column({ default: 1 })
  currentLevel: number;

  @ApiProperty({ description: 'Progress percentage' })
  @Column({ default: 0 })
  progressPercentage: number;

  @Column('simple-array', { default: '{}' })
  upcomingTasks: string[];

  @ApiProperty({ description: 'Bio' })
  @Column({ nullable: true })
  bio: string;

  @ApiProperty({ description: 'Avatar URL' })
  @Column({ nullable: true })
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => User, (user) => user.studentProfile)
  @JoinColumn()
  user: User;
}
