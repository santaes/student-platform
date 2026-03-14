import { Homework } from './homework.entity';
export declare class HomeworkAttachment {
    id: string;
    fileName: string;
    originalName: string;
    mimeType: string;
    fileSize: number;
    fileUrl: string;
    filePath: string;
    createdAt: Date;
    homework: Homework;
}
