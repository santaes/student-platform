import { Repository } from 'typeorm';
import { Roadmap } from '../entities/roadmap.entity';
import { Module } from '../entities/module.entity';
import { Lesson } from '../entities/lesson.entity';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { LessonStatus } from '../entities/lesson.entity';
export declare class RoadmapService {
    private roadmapRepository;
    private moduleRepository;
    private lessonRepository;
    private lessonProgressRepository;
    constructor(roadmapRepository: Repository<Roadmap>, moduleRepository: Repository<Module>, lessonRepository: Repository<Lesson>, lessonProgressRepository: Repository<LessonProgress>);
    getRoadmap(userId: string): Promise<Roadmap>;
    getModules(roadmapId: string): Promise<Module[]>;
    getLessons(moduleId: string): Promise<Lesson[]>;
    getLessonDetails(lessonId: string): Promise<Lesson>;
    updateLessonProgress(userId: string, lessonId: string, status: LessonStatus, progressPercentage: number): Promise<LessonProgress>;
}
