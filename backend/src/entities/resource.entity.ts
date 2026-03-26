import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('resources')
export class Resource {
  @ApiProperty({ description: 'Resource ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Resource title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Resource description' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Resource category' })
  @Column()
  category: string;

  @ApiProperty({ description: 'File name' })
  @Column()
  fileName: string;

  @ApiProperty({ description: 'File original name' })
  @Column()
  originalName: string;

  @ApiProperty({ description: 'File MIME type' })
  @Column()
  mimeType: string;

  @ApiProperty({ description: 'File size in bytes' })
  @Column()
  fileSize: number;

  @ApiProperty({ description: 'File URL' })
  @Column()
  fileUrl: string;

  @ApiProperty({ description: 'File path' })
  @Column()
  filePath: string;

  @ApiProperty({ description: 'Is resource active' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Download count' })
  @Column({ default: 0 })
  downloadCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
