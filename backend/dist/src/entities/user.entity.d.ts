import { StudentProfile } from './student-profile.entity';
import { LessonProgress } from './lesson-progress.entity';
import { Submission } from './submission.entity';
export declare enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    studentProfile: StudentProfile;
    lessonProgress: LessonProgress[];
    submissions: Submission[];
}
