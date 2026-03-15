import { Lesson } from './lesson.entity';
import { HomeworkAttachment } from './homework-attachment.entity';
import { Submission } from './submission.entity';
export declare enum HomeworkStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    OVERDUE = "overdue",
    GRADED = "graded"
}
export declare class Homework {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    maxScore: number;
    status: HomeworkStatus;
    instructorNotes: string;
    estimatedHours: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lesson: Lesson;
    attachments: HomeworkAttachment[];
    submissions: Submission[];
}
