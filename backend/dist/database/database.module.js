"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const seed_service_1 = require("./seed.service");
const user_entity_1 = require("../entities/user.entity");
const student_profile_entity_1 = require("../entities/student-profile.entity");
const roadmap_entity_1 = require("../entities/roadmap.entity");
const module_entity_1 = require("../entities/module.entity");
const lesson_entity_1 = require("../entities/lesson.entity");
const lesson_progress_entity_1 = require("../entities/lesson-progress.entity");
const homework_entity_1 = require("../entities/homework.entity");
const homework_attachment_entity_1 = require("../entities/homework-attachment.entity");
const submission_entity_1 = require("../entities/submission.entity");
const resource_entity_1 = require("../entities/resource.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                student_profile_entity_1.StudentProfile,
                roadmap_entity_1.Roadmap,
                module_entity_1.Module,
                lesson_entity_1.Lesson,
                lesson_progress_entity_1.LessonProgress,
                homework_entity_1.Homework,
                homework_attachment_entity_1.HomeworkAttachment,
                submission_entity_1.Submission,
                resource_entity_1.Resource,
            ]),
        ],
        providers: [seed_service_1.SeedService],
        exports: [seed_service_1.SeedService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map