import { User } from './user.entity';
import { Lesson } from './lesson.entity';
import { LessonStatus } from './lesson.entity';
export declare class LessonProgress {
    id: string;
    status: LessonStatus;
    progressPercentage: number;
    timeSpentMinutes: number;
    startedAt: Date;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    student: User;
    lesson: Lesson;
}
