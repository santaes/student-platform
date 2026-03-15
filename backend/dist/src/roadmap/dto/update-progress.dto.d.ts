import { LessonStatus } from '../../entities/lesson.entity';
export declare class UpdateProgressDto {
    status: LessonStatus;
    progressPercentage?: number;
}
