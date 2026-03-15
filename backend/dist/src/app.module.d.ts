import { OnModuleInit } from '@nestjs/common';
import { SeedService } from './database/seed.service';
export declare class AppModule implements OnModuleInit {
    private seedService;
    constructor(seedService: SeedService);
    onModuleInit(): Promise<void>;
}
