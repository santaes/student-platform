import { HomeworkService } from './homework.service';
import { SubmitHomeworkDto } from './dto/submit-homework.dto';
import { HomeworkStatus } from '../entities/homework.entity';
export declare class HomeworkController {
    private homeworkService;
    constructor(homeworkService: HomeworkService);
    getHomework(req: any, status?: HomeworkStatus): Promise<import("../entities/homework.entity").Homework[]>;
    getHomeworkById(id: number): Promise<import("../entities/homework.entity").Homework>;
    submitHomework(id: number, submitHomeworkDto: SubmitHomeworkDto, req: any): Promise<import("../entities/submission.entity").Submission>;
    markAsCompleted(id: number, req: any): Promise<import("../entities/homework.entity").Homework>;
}
