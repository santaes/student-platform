"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roadmap_service_1 = require("./roadmap.service");
const roadmap_controller_1 = require("./roadmap.controller");
const roadmap_entity_1 = require("../entities/roadmap.entity");
const module_entity_1 = require("../entities/module.entity");
const lesson_entity_1 = require("../entities/lesson.entity");
const lesson_progress_entity_1 = require("../entities/lesson-progress.entity");
const user_entity_1 = require("../entities/user.entity");
let RoadmapModule = class RoadmapModule {
};
exports.RoadmapModule = RoadmapModule;
exports.RoadmapModule = RoadmapModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([roadmap_entity_1.Roadmap, module_entity_1.Module, lesson_entity_1.Lesson, lesson_progress_entity_1.LessonProgress, user_entity_1.User])],
        controllers: [roadmap_controller_1.RoadmapController],
        providers: [roadmap_service_1.RoadmapService],
        exports: [roadmap_service_1.RoadmapService],
    })
], RoadmapModule);
//# sourceMappingURL=roadmap.module.js.map