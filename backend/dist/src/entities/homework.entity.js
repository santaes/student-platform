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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homework = exports.HomeworkStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const lesson_entity_1 = require("./lesson.entity");
const homework_attachment_entity_1 = require("./homework-attachment.entity");
const submission_entity_1 = require("./submission.entity");
var HomeworkStatus;
(function (HomeworkStatus) {
    HomeworkStatus["PENDING"] = "pending";
    HomeworkStatus["COMPLETED"] = "completed";
    HomeworkStatus["OVERDUE"] = "overdue";
    HomeworkStatus["GRADED"] = "graded";
})(HomeworkStatus || (exports.HomeworkStatus = HomeworkStatus = {}));
let Homework = class Homework {
};
exports.Homework = Homework;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Homework ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Homework.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Homework title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Homework.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Homework description' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Homework.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Due date' }),
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Homework.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum score' }),
    (0, typeorm_1.Column)({ default: 100 }),
    __metadata("design:type", Number)
], Homework.prototype, "maxScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Homework status', enum: HomeworkStatus }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: HomeworkStatus.PENDING,
    }),
    __metadata("design:type", String)
], Homework.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Instructor notes' }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Homework.prototype, "instructorNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estimated hours to complete' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Homework.prototype, "estimatedHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the homework is active' }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Homework.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Homework.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Homework.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, (lesson) => lesson.homework),
    __metadata("design:type", lesson_entity_1.Lesson)
], Homework.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => homework_attachment_entity_1.HomeworkAttachment, (attachment) => attachment.homework),
    __metadata("design:type", Array)
], Homework.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => submission_entity_1.Submission, (submission) => submission.homework),
    __metadata("design:type", Array)
], Homework.prototype, "submissions", void 0);
exports.Homework = Homework = __decorate([
    (0, typeorm_1.Entity)('homework')
], Homework);
//# sourceMappingURL=homework.entity.js.map