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
exports.StudentProfile = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
let StudentProfile = class StudentProfile {
};
exports.StudentProfile = StudentProfile;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student profile ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StudentProfile.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StudentProfile.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Enrolled learning program' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StudentProfile.prototype, "enrolledProgram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current learning level' }),
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], StudentProfile.prototype, "currentLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Progress percentage' }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StudentProfile.prototype, "progressPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { default: '{}' }),
    __metadata("design:type", Array)
], StudentProfile.prototype, "upcomingTasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bio' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentProfile.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Avatar URL' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentProfile.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StudentProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StudentProfile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.studentProfile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], StudentProfile.prototype, "user", void 0);
exports.StudentProfile = StudentProfile = __decorate([
    (0, typeorm_1.Entity)('student_profiles')
], StudentProfile);
//# sourceMappingURL=student-profile.entity.js.map