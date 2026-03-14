import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from '../entities/homework.entity';
import { HomeworkAttachment } from '../entities/homework-attachment.entity';
import { Submission, SubmissionStatus } from '../entities/submission.entity';
import { User } from '../entities/user.entity';
import { HomeworkStatus } from '../entities/homework.entity';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { SubmitHomeworkDto } from './dto/submit-homework.dto';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
    @InjectRepository(HomeworkAttachment)
    private attachmentRepository: Repository<HomeworkAttachment>,
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getHomework(userId: string, status?: HomeworkStatus) {
    const query = this.homeworkRepository
      .createQueryBuilder('homework')
      .leftJoinAndSelect('homework.attachments', 'attachments')
      .leftJoinAndSelect('homework.submissions', 'submissions')
      .leftJoinAndSelect('homework.lesson', 'lesson')
      .leftJoinAndSelect('lesson.module', 'module')
      .leftJoinAndSelect('module.roadmap', 'roadmap')
      .where('roadmap.isActive = :isActive AND lesson.isActive = :isActive', { isActive: true })
      .andWhere('module.isActive = :isActive', { isActive: true })
      .orderBy('homework.dueDate', 'ASC');

    if (status) {
      query.andWhere('homework.status = :status', { status });
    }

    const homework = await query.getMany();
    
    // Filter by student's roadmap (simplified for demo)
    return homework.filter(hw => {
      // In a real app, you'd check if the lesson belongs to the student's roadmap
      return true; // For demo purposes, return all homework
    });
  }

  async getHomeworkById(homeworkId: string): Promise<Homework> {
    return this.homeworkRepository.findOne({
      where: { id: homeworkId, isActive: true },
      relations: ['attachments', 'submissions', 'lesson'],
    });
  }

  async createHomework(createHomeworkDto: CreateHomeworkDto) {
    const homework = this.homeworkRepository.create({
      title: createHomeworkDto.title,
      description: createHomeworkDto.description,
      dueDate: new Date(createHomeworkDto.dueDate),
      status: HomeworkStatus.PENDING,
      instructorNotes: createHomeworkDto.instructorNotes,
      estimatedHours: createHomeworkDto.estimatedHours ? parseInt(createHomeworkDto.estimatedHours) : undefined,
    });

    return this.homeworkRepository.save(homework);
  }

  async submitHomework(userId: string, homeworkId: string, submitHomeworkDto: SubmitHomeworkDto) {
    const homework = await this.getHomeworkById(homeworkId);
    
    if (!homework) {
      throw new Error('Homework not found');
    }

    // Check if already submitted
    const existingSubmission = await this.submissionRepository.findOne({
      where: { student: { id: userId }, homework: { id: homeworkId } },
    });

    if (existingSubmission) {
      throw new Error('Homework already submitted');
    }

    const student = await this.userRepository.findOne({ where: { id: userId } });
    
    const submission = this.submissionRepository.create({
      textResponse: submitHomeworkDto.textResponse,
      status: SubmissionStatus.SUBMITTED,
      submittedAt: new Date(),
      student,
      homework,
    });

    const savedSubmission = await this.submissionRepository.save(submission);

    // Update homework status
    homework.status = HomeworkStatus.COMPLETED;
    await this.homeworkRepository.save(homework);

    return savedSubmission;
  }

  async markHomeworkCompleted(userId: string, homeworkId: string) {
    const homework = await this.getHomeworkById(homeworkId);
    
    if (!homework) {
      throw new Error('Homework not found');
    }

    // Check if already submitted
    const existingSubmission = await this.submissionRepository.findOne({
      where: { student: { id: userId }, homework: { id: homeworkId } },
    });

    if (!existingSubmission) {
      const student = await this.userRepository.findOne({ where: { id: userId } });
      
      const submission = this.submissionRepository.create({
        status: SubmissionStatus.SUBMITTED,
        submittedAt: new Date(),
        student,
        homework,
      });

      await this.submissionRepository.save(submission);
    }

    homework.status = HomeworkStatus.COMPLETED;
    return this.homeworkRepository.save(homework);
  }
}
