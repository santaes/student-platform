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
import { Roadmap } from './roadmap.entity';
import { Lesson } from './lesson.entity';

@Entity('modules')
export class Module {
  @ApiProperty({ description: 'Module ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Module title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Module description' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Module order in roadmap' })
  @Column({ default: 0 })
  order: number;

  @ApiProperty({ description: 'Is module active' })
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Roadmap, (roadmap) => roadmap.modules)
  roadmap: Roadmap;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];
}
