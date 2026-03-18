"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const roadmap_module_1 = require("./roadmap/roadmap.module");
const homework_module_1 = require("./homework/homework.module");
const resources_module_1 = require("./resources/resources.module");
const database_module_1 = require("./database/database.module");
const seed_service_1 = require("./database/seed.service");
const health_controller_1 = require("./health/health.controller");
let AppModule = class AppModule {
    constructor(seedService) {
        this.seedService = seedService;
    }
    async onModuleInit() {
        try {
            await this.seedService.seed();
        }
        catch (error) {
            console.log('Database seeding skipped (might already be seeded):', error.message);
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'development' ? '.env' : '.env.production',
                ignoreEnvFile: process.env.NODE_ENV === 'production',
                load: [],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const isDevelopment = configService.get('NODE_ENV') === 'development';
                    const databaseUrl = configService.get('DATABASE_URL') || process.env.DATABASE_URL;
                    const dbHost = configService.get('DB_HOST') || process.env.DB_HOST;
                    console.log('🔍 Environment check:', {
                        NODE_ENV: configService.get('NODE_ENV') || process.env.NODE_ENV,
                        DATABASE_URL: databaseUrl ? 'SET' : 'NOT SET',
                        DB_HOST: dbHost || 'NOT SET',
                        'All env vars': Object.keys(process.env).filter(key => key.includes('DB') || key.includes('DATABASE')),
                        'Render env vars': Object.keys(process.env).filter(key => key.includes('RENDER') || key.includes('PG')),
                        'All env keys': Object.keys(process.env).slice(0, 10)
                    });
                    if (databaseUrl) {
                        console.log('🐘 Using PostgreSQL database via DATABASE_URL');
                        return {
                            type: 'postgres',
                            url: databaseUrl,
                            entities: [__dirname + '/**/*.entity{.ts,.js}'],
                            synchronize: isDevelopment,
                            logging: isDevelopment,
                            ssl: databaseUrl.includes('render.com') ? { rejectUnauthorized: false } : false,
                        };
                    }
                    if (dbHost && !isDevelopment) {
                        console.log('🐘 Using PostgreSQL database with individual config');
                        return {
                            type: 'postgres',
                            host: dbHost,
                            port: configService.get('DB_PORT', 5432) || parseInt(process.env.DB_PORT || '5432'),
                            username: configService.get('DB_USERNAME', 'postgres') || process.env.DB_USERNAME || 'postgres',
                            password: configService.get('DB_PASSWORD', 'password') || process.env.DB_PASSWORD || 'password',
                            database: configService.get('DB_DATABASE', 'student_learning_platform') || process.env.DB_DATABASE || 'student_learning_platform',
                            entities: [__dirname + '/**/*.entity{.ts,.js}'],
                            synchronize: false,
                            logging: false,
                            ssl: dbHost.includes('render.com') || dbHost.includes('r.jina.ai') ? { rejectUnauthorized: false } : false,
                        };
                    }
                    if (!databaseUrl && !dbHost) {
                        console.log('🗄️ No database configuration found, using SQLite file database as fallback');
                        return {
                            type: 'sqlite',
                            database: './data/app.db',
                            entities: [__dirname + '/**/*.entity{.ts,.js}'],
                            synchronize: true,
                            logging: false,
                            driverOptions: {
                                enableWAL: true,
                            },
                        };
                    }
                    if (isDevelopment && (dbHost === 'localhost' || !dbHost)) {
                        console.log('🗄️  Using SQLite in-memory database for development');
                        return {
                            type: 'sqlite',
                            database: ':memory:',
                            entities: [__dirname + '/**/*.entity{.ts,.js}'],
                            synchronize: true,
                            logging: true,
                            driverOptions: {
                                enableWAL: true,
                            },
                        };
                    }
                    console.log('🐘 Using PostgreSQL database with individual config');
                    return {
                        type: 'postgres',
                        host: dbHost,
                        port: configService.get('DB_PORT', 5432),
                        username: configService.get('DB_USERNAME', 'postgres'),
                        password: configService.get('DB_PASSWORD', 'password'),
                        database: configService.get('DB_DATABASE', 'student_learning_platform'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: configService.get('NODE_ENV') === 'development',
                        logging: configService.get('NODE_ENV') === 'development',
                    };
                },
                inject: [config_1.ConfigService],
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roadmap_module_1.RoadmapModule,
            homework_module_1.HomeworkModule,
            resources_module_1.ResourcesModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [],
    }),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], AppModule);
//# sourceMappingURL=app.module.js.map