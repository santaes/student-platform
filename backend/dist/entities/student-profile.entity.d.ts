import { User } from './user.entity';
export declare class StudentProfile {
    id: number;
    fullName: string;
    enrolledProgram: string;
    currentLevel: number;
    progressPercentage: number;
    upcomingTasks: string[];
    bio: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
