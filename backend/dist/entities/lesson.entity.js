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
exports.Lesson = exports.LessonStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const module_entity_1 = require("./module.entity");
const lesson_progress_entity_1 = require("./lesson-progress.entity");
const homework_entity_1 = require("./homework.entity");
var LessonStatus;
(function (LessonStatus) {
    LessonStatus["LOCKED"] = "locked";
    LessonStatus["AVAILABLE"] = "available";
    LessonStatus["IN_PROGRESS"] = "in_progress";
    LessonStatus["COMPLETED"] = "completed";
})(LessonStatus || (exports.LessonStatus = LessonStatus = {}));
let Lesson = class Lesson {
};
exports.Lesson = Lesson;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson description' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson content' }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson order in module' }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estimated completion time in hours' }),
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Lesson.prototype, "estimatedHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson status', enum: LessonStatus }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: LessonStatus.LOCKED,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is lesson active' }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lesson.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Lesson.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => module_entity_1.Module, (module) => module.lessons),
    __metadata("design:type", module_entity_1.Module)
], Lesson.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_progress_entity_1.LessonProgress, (progress) => progress.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "lessonProgress", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => homework_entity_1.Homework, (homework) => homework.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "homework", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)('lessons')
], Lesson);
//# sourceMappingURL=lesson.entity.js.map