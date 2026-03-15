import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../entities/user.entity';
import { StudentProfile } from '../entities/student-profile.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private userRepository;
    private profileRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, profileRepository: Repository<StudentProfile>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            studentProfile: StudentProfile;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            studentProfile: StudentProfile;
        };
    }>;
    getUserProfile(userId: string): Promise<User>;
}
