import { RoadmapService } from './roadmap.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class RoadmapController {
    private roadmapService;
    constructor(roadmapService: RoadmapService);
    getRoadmap(req: any): Promise<import("../entities/roadmap.entity").Roadmap>;
    getModules(roadmapId: string): Promise<import("../entities/module.entity").Module[]>;
    getLessons(moduleId: string): Promise<import("../entities/lesson.entity").Lesson[]>;
    getLessonDetails(lessonId: string): Promise<import("../entities/lesson.entity").Lesson>;
    updateProgress(lessonId: string, updateProgressDto: UpdateProgressDto, req: any): Promise<import("../entities/lesson-progress.entity").LessonProgress>;
}
