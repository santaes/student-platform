import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("../entities/user.entity").User>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<import("../entities/student-profile.entity").StudentProfile>;
    getDashboardStats(req: any): Promise<{
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
