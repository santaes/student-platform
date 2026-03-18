import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import("../entities/user.entity").UserRole;
            studentProfile: import("../entities/student-profile.entity").StudentProfile;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import("../entities/user.entity").UserRole;
            studentProfile: import("../entities/student-profile.entity").StudentProfile;
        };
    }>;
    getProfile(req: any): Promise<import("../entities/user.entity").User>;
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
    }>;
}
