import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';
import { StudentProfile } from '../entities/student-profile.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(StudentProfile)
    private profileRepository: Repository<StudentProfile>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
      relations: ['studentProfile'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
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

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    // Validate password confirmation
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const hashedPassword = await hash(registerDto.password, 10);

    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      role: UserRole.STUDENT,
    });

    const savedUser = await this.userRepository.save(user);

    // Create student profile
    const profile = this.profileRepository.create({
      fullName: registerDto.fullName,
      enrolledProgram: 'General Studies',
      user: savedUser,
    });

    await this.profileRepository.save(profile);

    // Get the user with profile for response
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

  async getUserProfile(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId, isActive: true },
      relations: ['studentProfile'],
    });
  }
}
