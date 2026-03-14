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
exports.HomeworkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const homework_entity_1 = require("../entities/homework.entity");
const homework_attachment_entity_1 = require("../entities/homework-attachment.entity");
const submission_entity_1 = require("../entities/submission.entity");
const user_entity_1 = require("../entities/user.entity");
const homework_entity_2 = require("../entities/homework.entity");
let HomeworkService = class HomeworkService {
    constructor(homeworkRepository, attachmentRepository, submissionRepository, userRepository) {
        this.homeworkRepository = homeworkRepository;
        this.attachmentRepository = attachmentRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
    }
    async getHomework(userId, status) {
        const query = this.homeworkRepository
            .createQueryBuilder('homework')
            .leftJoinAndSelect('homework.attachments', 'attachments')
            .leftJoinAndSelect('homework.submissions', 'submissions')
            .leftJoinAndSelect('homework.lesson', 'lesson')
            .leftJoinAndSelect('lesson.module', 'module')
            .leftJoinAndSelect('module.roadmap', 'roadmap')
            .where('roadmap.isActive = :isActive AND lesson.isActive = :isActive', { isActive: true })
            .andWhere('module.isActive = :isActive', { isActive: true })
            .orderBy('homework.dueDate', 'ASC');
        if (status) {
            query.andWhere('homework.status = :status', { status });
        }
        const homework = await query.getMany();
        return homework.filter(hw => {
            return true;
        });
    }
    async getHomeworkById(homeworkId) {
        return this.homeworkRepository.findOne({
            where: { id: homeworkId, isActive: true },
            relations: ['attachments', 'submissions', 'lesson'],
        });
    }
    async createHomework(createHomeworkDto) {
        const homework = this.homeworkRepository.create({
            title: createHomeworkDto.title,
            description: createHomeworkDto.description,
            dueDate: new Date(createHomeworkDto.dueDate),
            status: homework_entity_2.HomeworkStatus.PENDING,
            instructorNotes: createHomeworkDto.instructorNotes,
            estimatedHours: createHomeworkDto.estimatedHours ? parseInt(createHomeworkDto.estimatedHours) : undefined,
        });
        return this.homeworkRepository.save(homework);
    }
    async submitHomework(userId, homeworkId, submitHomeworkDto) {
        const homework = await this.getHomeworkById(homeworkId);
        if (!homework) {
            throw new Error('Homework not found');
        }
        const existingSubmission = await this.submissionRepository.findOne({
            where: { student: { id: userId }, homework: { id: homeworkId } },
        });
        if (existingSubmission) {
            throw new Error('Homework already submitted');
        }
        const student = await this.userRepository.findOne({ where: { id: userId } });
        const submission = this.submissionRepository.create({
            textResponse: submitHomeworkDto.textResponse,
            status: submission_entity_1.SubmissionStatus.SUBMITTED,
            submittedAt: new Date(),
            student,
            homework,
        });
        const savedSubmission = await this.submissionRepository.save(submission);
        homework.status = homework_entity_2.HomeworkStatus.COMPLETED;
        await this.homeworkRepository.save(homework);
        return savedSubmission;
    }
    async markHomeworkCompleted(userId, homeworkId) {
        const homework = await this.getHomeworkById(homeworkId);
        if (!homework) {
            throw new Error('Homework not found');
        }
        const existingSubmission = await this.submissionRepository.findOne({
            where: { student: { id: userId }, homework: { id: homeworkId } },
        });
        if (!existingSubmission) {
            const student = await this.userRepository.findOne({ where: { id: userId } });
            const submission = this.submissionRepository.create({
                status: submission_entity_1.SubmissionStatus.SUBMITTED,
                submittedAt: new Date(),
                student,
                homework,
            });
            await this.submissionRepository.save(submission);
        }
        homework.status = homework_entity_2.HomeworkStatus.COMPLETED;
        return this.homeworkRepository.save(homework);
    }
};
exports.HomeworkService = HomeworkService;
exports.HomeworkService = HomeworkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(homework_entity_1.Homework)),
    __param(1, (0, typeorm_1.InjectRepository)(homework_attachment_entity_1.HomeworkAttachment)),
    __param(2, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HomeworkService);
//# sourceMappingURL=homework.service.js.map