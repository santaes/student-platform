import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Homework } from './homework.entity';

@Entity('homework_attachments')
export class HomeworkAttachment {
  @ApiProperty({ description: 'Attachment ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => Homework, (homework) => homework.attachments)
  homework: Homework;
}
