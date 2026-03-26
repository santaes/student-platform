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
exports.RoadmapController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roadmap_service_1 = require("./roadmap.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const update_progress_dto_1 = require("./dto/update-progress.dto");
let RoadmapController = class RoadmapController {
    constructor(roadmapService) {
        this.roadmapService = roadmapService;
    }
    async getRoadmap(req) {
        return this.roadmapService.getRoadmap(req.user.id);
    }
    async getModules(roadmapId) {
        return this.roadmapService.getModules(roadmapId);
    }
    async getLessons(moduleId) {
        return this.roadmapService.getLessons(moduleId);
    }
    async getLessonDetails(lessonId) {
        return this.roadmapService.getLessonDetails(lessonId);
    }
    async updateProgress(lessonId, updateProgressDto, req) {
        return this.roadmapService.updateLessonProgress(req.user.id, lessonId, updateProgressDto.status, updateProgressDto.progressPercentage);
    }
};
exports.RoadmapController = RoadmapController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user roadmap' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Roadmap retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoadmapController.prototype, "getRoadmap", null);
__decorate([
    (0, common_1.Get)('modules/:roadmapId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get roadmap modules' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Modules retrieved successfully' }),
    __param(0, (0, common_1.Param)('roadmapId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoadmapController.prototype, "getModules", null);
__decorate([
    (0, common_1.Get)('lessons/:moduleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get module lessons' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lessons retrieved successfully' }),
    __param(0, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoadmapController.prototype, "getLessons", null);
__decorate([
    (0, common_1.Get)('lesson/:lessonId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson details retrieved successfully' }),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoadmapController.prototype, "getLessonDetails", null);
__decorate([
    (0, common_1.Post)('lesson/:lessonId/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lesson progress' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson progress updated successfully' }),
    __param(0, (0, common_1.Param)('lessonId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_progress_dto_1.UpdateProgressDto, Object]),
    __metadata("design:returntype", Promise)
], RoadmapController.prototype, "updateProgress", null);
exports.RoadmapController = RoadmapController = __decorate([
    (0, swagger_1.ApiTags)('Roadmap'),
    (0, common_1.Controller)('roadmap'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [roadmap_service_1.RoadmapService])
], RoadmapController);
//# sourceMappingURL=roadmap.controller.js.map