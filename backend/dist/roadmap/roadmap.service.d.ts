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
    getRoadmap(userId: number): Promise<Roadmap>;
    getModules(roadmapId: number): Promise<Module[]>;
    getLessons(moduleId: number): Promise<Lesson[]>;
    getLessonDetails(lessonId: number): Promise<Lesson>;
    updateLessonProgress(userId: number, lessonId: number, status: LessonStatus, progressPercentage: number): Promise<LessonProgress>;
}
