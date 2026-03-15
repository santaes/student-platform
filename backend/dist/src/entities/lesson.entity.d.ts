import { Module } from './module.entity';
import { LessonProgress } from './lesson-progress.entity';
import { Homework } from './homework.entity';
export declare enum LessonStatus {
    LOCKED = "locked",
    AVAILABLE = "available",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Lesson {
    id: string;
    title: string;
    description: string;
    content: string;
    order: number;
    estimatedHours: number;
    status: LessonStatus;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    module: Module;
    lessonProgress: LessonProgress[];
    homework: Homework[];
}
