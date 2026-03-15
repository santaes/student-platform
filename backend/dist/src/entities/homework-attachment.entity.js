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
exports.HomeworkAttachment = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const homework_entity_1 = require("./homework.entity");
let HomeworkAttachment = class HomeworkAttachment {
};
exports.HomeworkAttachment = HomeworkAttachment;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], HomeworkAttachment.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HomeworkAttachment.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File original name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HomeworkAttachment.prototype, "originalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File MIME type' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HomeworkAttachment.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File size in bytes' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HomeworkAttachment.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File URL' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HomeworkAttachment.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File path' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HomeworkAttachment.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HomeworkAttachment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => homework_entity_1.Homework, (homework) => homework.attachments),
    __metadata("design:type", homework_entity_1.Homework)
], HomeworkAttachment.prototype, "homework", void 0);
exports.HomeworkAttachment = HomeworkAttachment = __decorate([
    (0, typeorm_1.Entity)('homework_attachments')
], HomeworkAttachment);
//# sourceMappingURL=homework-attachment.entity.js.map