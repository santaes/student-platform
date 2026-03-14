import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Module } from './module.entity';

@Entity('roadmaps')
export class Roadmap {
  @ApiProperty({ description: 'Roadmap ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Roadmap title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Roadmap description' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Is roadmap active' })
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Module, (module) => module.roadmap)
  modules: Module[];
}
