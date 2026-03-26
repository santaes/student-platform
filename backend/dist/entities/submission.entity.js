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
exports.Submission = exports.SubmissionStatus = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const homework_entity_1 = require("./homework.entity");
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["SUBMITTED"] = "submitted";
    SubmissionStatus["GRADED"] = "graded";
    SubmissionStatus["RETURNED"] = "returned";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
let Submission = class Submission {
};
exports.Submission = Submission;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submission ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Submission.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Text response' }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "textResponse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Score received' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submission status', enum: SubmissionStatus }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: SubmissionStatus.SUBMITTED,
    }),
    __metadata("design:type", String)
], Submission.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Instructor feedback' }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "instructorFeedback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submitted at' }),
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Submission.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Graded at' }),
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Submission.prototype, "gradedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Submission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Submission.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.submissions),
    __metadata("design:type", user_entity_1.User)
], Submission.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => homework_entity_1.Homework, (homework) => homework.submissions),
    __metadata("design:type", homework_entity_1.Homework)
], Submission.prototype, "homework", void 0);
exports.Submission = Submission = __decorate([
    (0, typeorm_1.Entity)('submissions'),
    (0, typeorm_1.Unique)(['student', 'homework'])
], Submission);
//# sourceMappingURL=submission.entity.js.map