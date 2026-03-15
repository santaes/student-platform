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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isDevelopment = configService.get('NODE_ENV') === 'development';
        const databaseUrl = configService.get('DATABASE_URL');
        const dbHost = configService.get('DB_HOST');
        
        // Use DATABASE_URL if provided (Render, Railway, etc.)
        if (databaseUrl) {
          console.log('🐘 Using PostgreSQL database via DATABASE_URL');
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: isDevelopment,
            logging: isDevelopment,
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
  controllers: [],
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
