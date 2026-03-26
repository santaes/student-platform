import { RoadmapService } from './roadmap.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class RoadmapController {
    private roadmapService;
    constructor(roadmapService: RoadmapService);
    getRoadmap(req: any): Promise<import("../entities/roadmap.entity").Roadmap>;
    getModules(roadmapId: number): Promise<import("../entities/module.entity").Module[]>;
    getLessons(moduleId: number): Promise<import("../entities/lesson.entity").Lesson[]>;
    getLessonDetails(lessonId: number): Promise<import("../entities/lesson.entity").Lesson>;
    updateProgress(lessonId: number, updateProgressDto: UpdateProgressDto, req: any): Promise<import("../entities/lesson-progress.entity").LessonProgress>;
}
