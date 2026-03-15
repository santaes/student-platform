export declare class CreateHomeworkDto {
    title: string;
    description: string;
    dueDate: string;
    lessonId: string;
    maxScore?: number;
    instructorNotes?: string;
}
export declare class SubmitHomeworkDto {
    textResponse?: string;
}
