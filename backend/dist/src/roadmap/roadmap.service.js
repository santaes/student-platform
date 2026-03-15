"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roadmap_entity_1 = require("../entities/roadmap.entity");
const module_entity_1 = require("../entities/module.entity");
const lesson_entity_1 = require("../entities/lesson.entity");
const lesson_progress_entity_1 = require("../entities/lesson-progress.entity");
const lesson_entity_2 = require("../entities/lesson.entity");
let RoadmapService = class RoadmapService {
    constructor(roadmapRepository, moduleRepository, lessonRepository, lessonProgressRepository) {
        this.roadmapRepository = roadmapRepository;
        this.moduleRepository = moduleRepository;
        this.lessonRepository = lessonRepository;
        this.lessonProgressRepository = lessonProgressRepository;
    }
    async getRoadmap(userId) {
        const roadmap = await this.roadmapRepository.findOne({
            where: { isActive: true },
            relations: ['modules', 'modules.lessons'],
            order: { createdAt: 'DESC' },
        });
        if (!roadmap) {
            throw new Error('No active roadmap found');
        }
        const userProgress = await this.lessonProgressRepository.find({
            where: { student: { id: userId } },
            relations: ['lesson'],
        });
        roadmap.modules.forEach(module => {
            module.lessons.forEach(lesson => {
                const progress = userProgress.find(p => p.lesson.id === lesson.id);
                if (progress) {
                    lesson.status = progress.status;
                }
                else {
                    lesson.status = lesson_entity_2.LessonStatus.LOCKED;
                }
            });
        });
        return roadmap;
    }
    async getModules(roadmapId) {
        return this.moduleRepository.find({
            where: { roadmap: { id: roadmapId }, isActive: true },
            relations: ['lessons'],
            order: { order: 'ASC' },
        });
    }
    async getLessons(moduleId) {
        return this.lessonRepository.find({
            where: { module: { id: moduleId }, isActive: true },
            order: { order: 'ASC' },
        });
    }
    async getLessonDetails(lessonId) {
        return this.lessonRepository.findOne({
            where: { id: lessonId, isActive: true },
            relations: ['module', 'module.roadmap'],
        });
    }
    async updateLessonProgress(userId, lessonId, status, progressPercentage) {
        const existingProgress = await this.lessonProgressRepository.findOne({
            where: { student: { id: userId }, lesson: { id: lessonId } },
        });
        if (existingProgress) {
            existingProgress.status = status;
            existingProgress.progressPercentage = progressPercentage;
            if (status === lesson_entity_2.LessonStatus.IN_PROGRESS && !existingProgress.startedAt) {
                existingProgress.startedAt = new Date();
            }
            if (status === lesson_entity_2.LessonStatus.COMPLETED && !existingProgress.completedAt) {
                existingProgress.completedAt = new Date();
            }
            return this.lessonProgressRepository.save(existingProgress);
        }
        else {
            const newProgress = this.lessonProgressRepository.create({
                student: { id: userId },
                lesson: { id: lessonId },
                status,
                progressPercentage,
                startedAt: status === lesson_entity_2.LessonStatus.IN_PROGRESS ? new Date() : null,
                completedAt: status === lesson_entity_2.LessonStatus.COMPLETED ? new Date() : null,
            });
            return this.lessonProgressRepository.save(newProgress);
        }
    }
};
exports.RoadmapService = RoadmapService;
exports.RoadmapService = RoadmapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roadmap_entity_1.Roadmap)),
    __param(1, (0, typeorm_1.InjectRepository)(module_entity_1.Module)),
    __param(2, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(3, (0, typeorm_1.InjectRepository)(lesson_progress_entity_1.LessonProgress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoadmapService);
//# sourceMappingURL=roadmap.service.js.map