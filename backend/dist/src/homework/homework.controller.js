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
exports.HomeworkController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const homework_service_1 = require("./homework.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const submit_homework_dto_1 = require("./dto/submit-homework.dto");
const homework_entity_1 = require("../entities/homework.entity");
let HomeworkController = class HomeworkController {
    constructor(homeworkService) {
        this.homeworkService = homeworkService;
    }
    async getHomework(req, status) {
        return this.homeworkService.getHomework(req.user.id, status);
    }
    async getHomeworkById(id) {
        return this.homeworkService.getHomeworkById(id);
    }
    async submitHomework(id, submitHomeworkDto, req) {
        return this.homeworkService.submitHomework(req.user.id, id, submitHomeworkDto);
    }
    async markAsCompleted(id, req) {
        return this.homeworkService.markHomeworkCompleted(req.user.id, id);
    }
};
exports.HomeworkController = HomeworkController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get homework list' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Homework list retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "getHomework", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get homework details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Homework details retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "getHomeworkById", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit homework' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Homework submitted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_homework_dto_1.SubmitHomeworkDto, Object]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "submitHomework", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark homework as completed' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Homework marked as completed' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HomeworkController.prototype, "markAsCompleted", null);
exports.HomeworkController = HomeworkController = __decorate([
    (0, swagger_1.ApiTags)('Homework'),
    (0, common_1.Controller)('homework'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [homework_service_1.HomeworkService])
], HomeworkController);
//# sourceMappingURL=homework.controller.js.map