import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roadmap } from '../entities/roadmap.entity';
import { Module } from '../entities/module.entity';
import { Lesson } from '../entities/lesson.entity';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { LessonStatus } from '../entities/lesson.entity';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectRepository(Roadmap)
    private roadmapRepository: Repository<Roadmap>,
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(LessonProgress)
    private lessonProgressRepository: Repository<LessonProgress>,
  ) {}

  async getRoadmap(userId: number) {
    // For now, return the first active roadmap
    // In a real app, you'd assign roadmaps to users
    const roadmap = await this.roadmapRepository.findOne({
      where: { isActive: true },
      relations: ['modules', 'modules.lessons'],
      order: { createdAt: 'DESC' },
    });

    if (!roadmap) {
      throw new Error('No active roadmap found');
    }

    // Get user's lesson progress
    const userProgress = await this.lessonProgressRepository.find({
      where: { student: { id: userId } },
      relations: ['lesson'],
    });

    // Enhance lessons with progress
    roadmap.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        const progress = userProgress.find(p => p.lesson.id === lesson.id);
        if (progress) {
          lesson.status = progress.status;
        } else {
          lesson.status = LessonStatus.LOCKED;
        }
      });
    });

    return roadmap;
  }

  async getModules(roadmapId: number) {
    return this.moduleRepository.find({
      where: { roadmap: { id: roadmapId }, isActive: true },
      relations: ['lessons'],
      order: { order: 'ASC' },
    });
  }

  async getLessons(moduleId: number) {
    return this.lessonRepository.find({
      where: { module: { id: moduleId }, isActive: true },
      order: { order: 'ASC' },
    });
  }

  async getLessonDetails(lessonId: number) {
    return this.lessonRepository.findOne({
      where: { id: lessonId, isActive: true },
      relations: ['module', 'module.roadmap'],
    });
  }

  async updateLessonProgress(userId: number, lessonId: number, status: LessonStatus, progressPercentage: number) {
    const existingProgress = await this.lessonProgressRepository.findOne({
      where: { student: { id: userId }, lesson: { id: lessonId } },
    });

    if (existingProgress) {
      existingProgress.status = status;
      existingProgress.progressPercentage = progressPercentage;
      
      if (status === LessonStatus.IN_PROGRESS && !existingProgress.startedAt) {
        existingProgress.startedAt = new Date();
      }
      
      if (status === LessonStatus.COMPLETED && !existingProgress.completedAt) {
        existingProgress.completedAt = new Date();
      }

      return this.lessonProgressRepository.save(existingProgress);
    } else {
      const newProgress = this.lessonProgressRepository.create({
        student: { id: userId },
        lesson: { id: lessonId },
        status,
        progressPercentage,
        startedAt: status === LessonStatus.IN_PROGRESS ? new Date() : null,
        completedAt: status === LessonStatus.COMPLETED ? new Date() : null,
      });

      return this.lessonProgressRepository.save(newProgress);
    }
  }
}
