import { Repository } from 'typeorm';
import { Homework } from '../entities/homework.entity';
import { HomeworkAttachment } from '../entities/homework-attachment.entity';
import { Submission } from '../entities/submission.entity';
import { User } from '../entities/user.entity';
import { HomeworkStatus } from '../entities/homework.entity';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { SubmitHomeworkDto } from './dto/submit-homework.dto';
export declare class HomeworkService {
    private homeworkRepository;
    private attachmentRepository;
    private submissionRepository;
    private userRepository;
    constructor(homeworkRepository: Repository<Homework>, attachmentRepository: Repository<HomeworkAttachment>, submissionRepository: Repository<Submission>, userRepository: Repository<User>);
    getHomework(userId: string, status?: HomeworkStatus): Promise<Homework[]>;
    getHomeworkById(homeworkId: string): Promise<Homework>;
    createHomework(createHomeworkDto: CreateHomeworkDto): Promise<Homework>;
    submitHomework(userId: string, homeworkId: string, submitHomeworkDto: SubmitHomeworkDto): Promise<Submission>;
    markHomeworkCompleted(userId: string, homeworkId: string): Promise<Homework>;
}
