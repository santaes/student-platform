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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const student_profile_entity_1 = require("../entities/student-profile.entity");
let UsersService = class UsersService {
    constructor(userRepository, profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }
    async getProfile(userId) {
        return this.userRepository.findOne({
            where: { id: userId, isActive: true },
            relations: ['studentProfile'],
        });
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['studentProfile'],
        });
        if (!user) {
            throw new Error('User not found');
        }
        const profile = user.studentProfile;
        if (profile) {
            Object.assign(profile, updateProfileDto);
            return this.profileRepository.save(profile);
        }
        else {
            const newProfile = this.profileRepository.create({
                ...updateProfileDto,
                user,
            });
            return this.profileRepository.save(newProfile);
        }
    }
    async getDashboardStats(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['studentProfile', 'lessonProgress', 'submissions'],
        });
        if (!user) {
            throw new Error('User not found');
        }
        const profile = user.studentProfile;
        const completedLessons = user.lessonProgress?.filter(p => p.status === 'completed').length || 0;
        const totalLessons = user.lessonProgress?.length || 0;
        const pendingHomework = user.submissions?.filter(s => s.status === 'submitted').length || 0;
        return {
            roadmapProgress: profile?.progressPercentage || 0,
            pendingHomeworkCount: pendingHomework,
            currentLevel: profile?.currentLevel || 1,
            upcomingTasks: profile?.upcomingTasks || [],
            recentActivities: [
                {
                    icon: 'assignment_turned_in',
                    description: 'Завершено домашнє завдання "Українська граматика"',
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
                },
                {
                    icon: 'school',
                    description: 'Почато вивчення модуля "Українська мова для початківців"',
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
                },
                {
                    icon: 'timeline',
                    description: 'Досягнуто 75% прогресу в навчальному плані',
                    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                }
            ]
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(student_profile_entity_1.StudentProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map