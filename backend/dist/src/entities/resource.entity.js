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
exports.Resource = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Resource = class Resource {
};
exports.Resource = Resource;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resource ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Resource.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resource title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resource.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resource description' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Resource.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resource category' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resource.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resource.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File original name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resource.prototype, "originalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File MIME type' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resource.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File size in bytes' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resource.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File URL' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resource.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File path' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resource.prototype, "filePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is resource active' }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Download count' }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Resource.prototype, "downloadCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Resource.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Resource.prototype, "updatedAt", void 0);
exports.Resource = Resource = __decorate([
    (0, typeorm_1.Entity)('resources')
], Resource);
//# sourceMappingURL=resource.entity.js.map