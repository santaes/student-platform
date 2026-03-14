import { Roadmap } from './roadmap.entity';
import { Lesson } from './lesson.entity';
export declare class Module {
    id: string;
    title: string;
    description: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    roadmap: Roadmap;
    lessons: Lesson[];
}
