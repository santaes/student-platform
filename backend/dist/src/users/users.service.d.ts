import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { StudentProfile } from '../entities/student-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private userRepository;
    private profileRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<StudentProfile>);
    getProfile(userId: string): Promise<User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<StudentProfile>;
    getDashboardStats(userId: string): Promise<{
        roadmapProgress: number;
        pendingHomeworkCount: number;
        currentLevel: number;
        upcomingTasks: string[];
        recentActivities: {
            icon: string;
            description: string;
            date: Date;
        }[];
    }>;
}
