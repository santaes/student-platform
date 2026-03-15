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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const student_profile_entity_1 = require("../entities/student-profile.entity");
const roadmap_entity_1 = require("../entities/roadmap.entity");
const module_entity_1 = require("../entities/module.entity");
const lesson_entity_1 = require("../entities/lesson.entity");
const lesson_progress_entity_1 = require("../entities/lesson-progress.entity");
const homework_entity_1 = require("../entities/homework.entity");
const resource_entity_1 = require("../entities/resource.entity");
const submission_entity_1 = require("../entities/submission.entity");
const bcrypt = require("bcrypt");
let SeedService = class SeedService {
    constructor(userRepository, profileRepository, roadmapRepository, moduleRepository, lessonRepository, lessonProgressRepository, homeworkRepository, resourceRepository, submissionRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.roadmapRepository = roadmapRepository;
        this.moduleRepository = moduleRepository;
        this.lessonRepository = lessonRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.homeworkRepository = homeworkRepository;
        this.resourceRepository = resourceRepository;
        this.submissionRepository = submissionRepository;
    }
    async seed() {
        console.log('🌱 Starting database seeding...');
        await this.clearDatabase();
        const users = await this.createUsers();
        const roadmaps = await this.createRoadmaps();
        await this.createModulesAndLessons(roadmaps);
        await this.createLessonProgress(users);
        await this.createHomework();
        await this.createResources();
        await this.createSubmissions(users);
        console.log('✅ Database seeding completed!');
    }
    async clearDatabase() {
        await this.submissionRepository.clear();
        await this.resourceRepository.clear();
        await this.homeworkRepository.clear();
        await this.lessonProgressRepository.clear();
        await this.lessonRepository.clear();
        await this.moduleRepository.clear();
        await this.roadmapRepository.clear();
        await this.profileRepository.clear();
        await this.userRepository.clear();
    }
    async createUsers() {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const users = [
            {
                email: 'maria.garcia@example.com',
                password: hashedPassword,
                role: user_entity_1.UserRole.STUDENT,
                isActive: true,
            },
            {
                email: 'oleks.petrov@example.com',
                password: hashedPassword,
                role: user_entity_1.UserRole.STUDENT,
                isActive: true,
            },
        ];
        const createdUsers = [];
        for (const userData of users) {
            const user = this.userRepository.create(userData);
            const savedUser = await this.userRepository.save(user);
            const profile = this.profileRepository.create({
                fullName: userData.email === 'maria.garcia@example.com' ? 'María García' : 'Олександр Петренко',
                enrolledProgram: userData.email === 'maria.garcia@example.com' ? 'Español para principiantes' : 'Українська мова для початківців',
                currentLevel: userData.email === 'maria.garcia@example.com' ? 2 : 3,
                progressPercentage: userData.email === 'maria.garcia@example.com' ? 65 : 75,
                upcomingTasks: userData.email === 'maria.garcia@example.com'
                    ? ['Completar lección de vocabulario', 'Practicar conjugación presente']
                    : ['Завершити урок "Привітання та знайомство"', 'Виконати вправу з алфавіту'],
                bio: userData.email === 'maria.garcia@example.com'
                    ? 'Estudiante apasionada por aprender español'
                    : 'Студент, який вивчає українську мову',
                user: savedUser,
            });
            await this.profileRepository.save(profile);
            createdUsers.push(savedUser);
        }
        return createdUsers;
    }
    async createRoadmaps() {
        const roadmaps = [
            {
                title: 'Español para Principiantes',
                description: 'Curso completo de español para estudiantes principiantes con enfoque en comunicación básica, gramática y cultura hispana.',
                isActive: true,
            },
            {
                title: 'Українська мова для початківців',
                description: 'Повний курс української мови для початківців з акцентом на розмовні, читання та писання.',
                isActive: true,
            },
        ];
        const createdRoadmaps = [];
        for (const roadmapData of roadmaps) {
            const roadmap = this.roadmapRepository.create(roadmapData);
            createdRoadmaps.push(await this.roadmapRepository.save(roadmap));
        }
        return createdRoadmaps;
    }
    async createModulesAndLessons(roadmaps) {
        for (const roadmap of roadmaps) {
            const isSpanish = roadmap.title.includes('Español');
            const modulesData = isSpanish ? [
                { title: 'Módulo 1: Fundamentos', description: 'Introducción al español, alfabeto, pronunciación y saludos básicos', order: 1 },
                { title: 'Módulo 2: Vocabulario Básico', description: 'Palabras comunes, números, colores, días de la semana', order: 2 },
            ] : [
                { title: 'Модуль 1: Основи', description: 'Вступ до української мови, алфавіт, вимова та привітання', order: 1 },
                { title: 'Модуль 2: Лексика', description: 'Базова лексика, числа, дні тижня, кольори', order: 2 },
            ];
            for (const moduleData of modulesData) {
                const module = this.moduleRepository.create({
                    ...moduleData,
                    roadmap,
                });
                const savedModule = await this.moduleRepository.save(module);
                const lessonsData = isSpanish ? [
                    { title: 'El Alfabeto y Pronunciación', description: 'Aprender el alfabeto español y la pronunciación correcta', order: 1, estimatedHours: 2 },
                    { title: 'Saludos y Presentaciones', description: 'Cómo saludar y presentarse en español', order: 2, estimatedHours: 1 },
                ] : [
                    { title: 'Алфавіт та вимова', description: 'Вивчення українського алфавіту та правильна вимова', order: 1, estimatedHours: 3 },
                    { title: 'Привітання та знайомство', description: 'Як привітатися та представитися українською', order: 2, estimatedHours: 2 },
                ];
                for (const lessonData of lessonsData) {
                    const lesson = this.lessonRepository.create({
                        ...lessonData,
                        module: savedModule,
                        status: lesson_entity_1.LessonStatus.AVAILABLE,
                    });
                    await this.lessonRepository.save(lesson);
                }
            }
        }
    }
    async createLessonProgress(users) {
        const lessons = await this.lessonRepository.find();
        for (const user of users) {
            const userLessons = lessons.slice(0, 2);
            for (let i = 0; i < userLessons.length; i++) {
                const lesson = userLessons[i];
                const progress = this.lessonProgressRepository.create({
                    student: user,
                    lesson,
                    status: i === 0 ? lesson_entity_1.LessonStatus.COMPLETED : lesson_entity_1.LessonStatus.IN_PROGRESS,
                    progressPercentage: i === 0 ? 100 : 60,
                    timeSpentMinutes: i === 0 ? 120 : 60,
                    startedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000),
                    completedAt: i === 0 ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) : null,
                });
                await this.lessonProgressRepository.save(progress);
            }
        }
    }
    async createHomework() {
        const lessons = await this.lessonRepository.find();
        for (const lesson of lessons.slice(0, 2)) {
            const isSpanish = lesson.title.includes('El') || lesson.title.includes('Saludos');
            const homework = this.homeworkRepository.create({
                lesson,
                title: isSpanish ? 'Práctica del Alfabeto' : 'Практика алфавіту',
                description: isSpanish
                    ? 'Escribe todas las letras del alfabeto español y practica su pronunciación'
                    : 'Напишіть усі літери українського алфавіту',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                maxScore: 100,
                status: homework_entity_1.HomeworkStatus.PENDING,
                instructorNotes: isSpanish
                    ? 'Presta atención a las letras G, J, Ñ, LL'
                    : 'Зверніть увагу на правильну вимову літер Г, Ґ, Ї',
                estimatedHours: 2,
            });
            await this.homeworkRepository.save(homework);
        }
    }
    async createResources() {
        const resources = [
            {
                title: 'Guía Completa del Alfabeto Español',
                description: 'PDF completo con guía visual del alfabeto español',
                category: 'Español',
                fileName: 'guia-alfabeto.pdf',
                originalName: 'guia-alfabeto.pdf',
                mimeType: 'application/pdf',
                fileSize: 2048000,
                fileUrl: '/resources/guides/guia-alfabeto.pdf',
                filePath: '/uploads/guides/guia-alfabeto.pdf',
            },
            {
                title: 'Повний посібник українського алфавіту',
                description: 'PDF з детальною інформацією про український алфавіт',
                category: 'Українська',
                fileName: 'ukrainian-alphabet.pdf',
                originalName: 'ukrainian-alphabet.pdf',
                mimeType: 'application/pdf',
                fileSize: 3072000,
                fileUrl: '/resources/guides/ukrainian-alphabet.pdf',
                filePath: '/uploads/guides/ukrainian-alphabet.pdf',
            },
        ];
        for (const resourceData of resources) {
            const resource = this.resourceRepository.create(resourceData);
            await this.resourceRepository.save(resource);
        }
    }
    async createSubmissions(users) {
        const homework = await this.homeworkRepository.find({ take: 2 });
        for (let i = 0; i < users.length && i < homework.length; i++) {
            const isSpanish = i === 0;
            const submission = this.submissionRepository.create({
                homework: homework[i],
                student: users[i],
                textResponse: isSpanish
                    ? 'He completado el ejercicio del alfabeto. Las letras más difíciles fueron la ñ y la ll.'
                    : 'Я виконав вправу з алфавіту. Найскладнішими були літери ґ та ї.',
                score: isSpanish ? 95 : 92,
                status: submission_entity_1.SubmissionStatus.GRADED,
                instructorFeedback: isSpanish
                    ? 'Excelente trabajo! Presta especial atención a la pronunciación de la rr.'
                    : 'Чудова робота! Зверни увагу на правильну вимову літери ї.',
                submittedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000),
                gradedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
            });
            await this.submissionRepository.save(submission);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(student_profile_entity_1.StudentProfile)),
    __param(2, (0, typeorm_1.InjectRepository)(roadmap_entity_1.Roadmap)),
    __param(3, (0, typeorm_1.InjectRepository)(module_entity_1.Module)),
    __param(4, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(5, (0, typeorm_1.InjectRepository)(lesson_progress_entity_1.LessonProgress)),
    __param(6, (0, typeorm_1.InjectRepository)(homework_entity_1.Homework)),
    __param(7, (0, typeorm_1.InjectRepository)(resource_entity_1.Resource)),
    __param(8, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map