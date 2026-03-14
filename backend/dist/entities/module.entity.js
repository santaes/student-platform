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
exports.Module = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const roadmap_entity_1 = require("./roadmap.entity");
const lesson_entity_1 = require("./lesson.entity");
let Module = class Module {
};
exports.Module = Module;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module ID' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Module.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Module.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module description' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Module.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module order in roadmap' }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Module.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is module active' }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Module.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Module.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Module.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roadmap_entity_1.Roadmap, (roadmap) => roadmap.modules),
    __metadata("design:type", roadmap_entity_1.Roadmap)
], Module.prototype, "roadmap", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.module),
    __metadata("design:type", Array)
], Module.prototype, "lessons", void 0);
exports.Module = Module = __decorate([
    (0, typeorm_1.Entity)('modules')
], Module);
//# sourceMappingURL=module.entity.js.map