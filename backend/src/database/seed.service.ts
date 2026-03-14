import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { StudentProfile } from '../entities/student-profile.entity';
import { Roadmap } from '../entities/roadmap.entity';
import { Module } from '../entities/module.entity';
import { Lesson, LessonStatus } from '../entities/lesson.entity';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { Homework, HomeworkStatus } from '../entities/homework.entity';
import { Resource } from '../entities/resource.entity';
import { Submission, SubmissionStatus } from '../entities/submission.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(StudentProfile)
    private profileRepository: Repository<StudentProfile>,
    @InjectRepository(Roadmap)
    private roadmapRepository: Repository<Roadmap>,
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(LessonProgress)
    private lessonProgressRepository: Repository<LessonProgress>,
    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await this.clearDatabase();

    // Create demo users
    const users = await this.createUsers();

    // Create roadmaps
    const roadmaps = await this.createRoadmaps();

    // Create modules and lessons
    await this.createModulesAndLessons(roadmaps);

    // Create lesson progress
    await this.createLessonProgress(users);

    // Create homework
    await this.createHomework();

    // Create resources
    await this.createResources();

    // Create submissions
    await this.createSubmissions(users);

    console.log('✅ Database seeding completed!');
  }

  private async clearDatabase() {
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

  private async createUsers(): Promise<User[]> {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [
      {
        email: 'maria.garcia@example.com',
        password: hashedPassword,
        role: UserRole.STUDENT,
        isActive: true,
      },
      {
        email: 'oleks.petrov@example.com',
        password: hashedPassword,
        role: UserRole.STUDENT,
        isActive: true,
      },
    ];

    const createdUsers = [];
    for (const userData of users) {
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);
      
      // Create student profile
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

  private async createRoadmaps(): Promise<Roadmap[]> {
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

  private async createModulesAndLessons(roadmaps: Roadmap[]) {
    for (const roadmap of roadmaps) {
      const isSpanish = roadmap.title.includes('Español');
      
      // Create modules
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

        // Create lessons
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
            status: LessonStatus.AVAILABLE,
          });
          await this.lessonRepository.save(lesson);
        }
      }
    }
  }

  private async createLessonProgress(users: User[]) {
    const lessons = await this.lessonRepository.find();
    
    for (const user of users) {
      const userLessons = lessons.slice(0, 2); // Give progress for first 2 lessons
      
      for (let i = 0; i < userLessons.length; i++) {
        const lesson = userLessons[i];
        const progress = this.lessonProgressRepository.create({
          student: user,
          lesson,
          status: i === 0 ? LessonStatus.COMPLETED : LessonStatus.IN_PROGRESS,
          progressPercentage: i === 0 ? 100 : 60,
          timeSpentMinutes: i === 0 ? 120 : 60,
          startedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000),
          completedAt: i === 0 ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) : null,
        });
        await this.lessonProgressRepository.save(progress);
      }
    }
  }

  private async createHomework() {
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
        status: HomeworkStatus.PENDING,
        instructorNotes: isSpanish 
          ? 'Presta atención a las letras G, J, Ñ, LL'
          : 'Зверніть увагу на правильну вимову літер Г, Ґ, Ї',
        estimatedHours: 2,
      });
      
      await this.homeworkRepository.save(homework);
    }
  }

  private async createResources() {
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

  private async createSubmissions(users: User[]) {
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
        status: SubmissionStatus.GRADED,
        instructorFeedback: isSpanish 
          ? 'Excelente trabajo! Presta especial atención a la pronunciación de la rr.'
          : 'Чудова робота! Зверни увагу на правильну вимову літери ї.',
        submittedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000),
        gradedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      });
      
      await this.submissionRepository.save(submission);
    }
  }
}
