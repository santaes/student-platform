import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { StudentProfile } from '../entities/student-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(StudentProfile)
    private profileRepository: Repository<StudentProfile>,
  ) {}

  async getProfile(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId, isActive: true },
      relations: ['studentProfile'],
    });
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<StudentProfile> {
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
    } else {
      const newProfile = this.profileRepository.create({
        ...updateProfileDto,
        user,
      });
      return this.profileRepository.save(newProfile);
    }
  }

  async getDashboardStats(userId: number) {
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
}
