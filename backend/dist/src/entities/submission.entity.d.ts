import { User } from './user.entity';
import { Homework } from './homework.entity';
export declare enum SubmissionStatus {
    SUBMITTED = "submitted",
    GRADED = "graded",
    RETURNED = "returned"
}
export declare class Submission {
    id: string;
    textResponse: string;
    score: number;
    status: SubmissionStatus;
    instructorFeedback: string;
    submittedAt: Date;
    gradedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    student: User;
    homework: Homework;
}
