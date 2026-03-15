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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
const student_profile_entity_1 = require("../entities/student-profile.entity");
let AuthService = class AuthService {
    constructor(userRepository, profileRepository, jwtService) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email, isActive: true },
            relations: ['studentProfile'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                studentProfile: user.studentProfile,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('User with this email already exists');
        }
        const hashedPassword = await (0, bcrypt_1.hash)(registerDto.password, 10);
        const user = this.userRepository.create({
            email: registerDto.email,
            password: hashedPassword,
            role: user_entity_1.UserRole.STUDENT,
        });
        const savedUser = await this.userRepository.save(user);
        const profile = this.profileRepository.create({
            fullName: registerDto.fullName,
            enrolledProgram: 'General Studies',
            user: savedUser,
        });
        await this.profileRepository.save(profile);
        const userWithProfile = await this.userRepository.findOne({
            where: { id: savedUser.id },
            relations: ['studentProfile'],
        });
        const payload = {
            sub: userWithProfile.id,
            email: userWithProfile.email,
            role: userWithProfile.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: userWithProfile.id,
                email: userWithProfile.email,
                role: userWithProfile.role,
                studentProfile: userWithProfile.studentProfile,
            },
        };
    }
    async getUserProfile(userId) {
        return this.userRepository.findOne({
            where: { id: userId, isActive: true },
            relations: ['studentProfile'],
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(student_profile_entity_1.StudentProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map