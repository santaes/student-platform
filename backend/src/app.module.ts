import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { HomeworkModule } from './homework/homework.module';
import { ResourcesModule } from './resources/resources.module';
import { DatabaseModule } from './database/database.module';
import { SeedService } from './database/seed.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : '.env.production',
      ignoreEnvFile: process.env.NODE_ENV === 'production', // Ignore .env files in production, use system env vars
      load: [], // Ensure we load from process.env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isDevelopment = configService.get('NODE_ENV') === 'development';
        const databaseUrl = configService.get('DATABASE_URL') || process.env.DATABASE_URL;
        const dbHost = configService.get('DB_HOST') || process.env.DB_HOST;
        
        console.log('🔍 Environment check:', {
          NODE_ENV: configService.get('NODE_ENV') || process.env.NODE_ENV,
          DATABASE_URL: databaseUrl ? 'SET' : 'NOT SET',
          DB_HOST: dbHost || 'NOT SET',
          'All env vars': Object.keys(process.env).filter(key => key.includes('DB') || key.includes('DATABASE')),
          'Render env vars': Object.keys(process.env).filter(key => key.includes('RENDER') || key.includes('PG')),
          'All env keys': Object.keys(process.env).slice(0, 10) // Show first 10 env vars
        });
        
        // Use DATABASE_URL if provided (Render, Railway, etc.)
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
        
        // Use individual database config if DATABASE_URL is not available
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
            synchronize: false, // Don't auto-sync in production
            logging: false,
            ssl: dbHost.includes('render.com') || dbHost.includes('r.jina.ai') ? { rejectUnauthorized: false } : false,
          };
        }
        
        // Fallback to SQLite in production if no database config is available
        if (!databaseUrl && !dbHost) {
          console.log('🗄️ No database configuration found, using SQLite file database as fallback');
          return {
            type: 'sqlite',
            database: './data/app.db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Allow sync for initial setup
            logging: false,
            driverOptions: {
              enableWAL: true,
            },
          };
        }
        
        // Force SQLite for development when DB_HOST is localhost or empty
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
        
        // Use PostgreSQL for production with individual config
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
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RoadmapModule,
    HomeworkModule,
    ResourcesModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private seedService: SeedService) {}

  async onModuleInit() {
    try {
      await this.seedService.seed();
    } catch (error) {
      console.log('Database seeding skipped (might already be seeded):', error.message);
    }
  }
}
