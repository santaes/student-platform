import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

// Polyfill for crypto.randomUUID in case it's not available
if (!(globalThis as any).crypto?.randomUUID) {
  (globalThis as any).crypto = {
    randomUUID: () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    subtle: undefined,
    getRandomValues: undefined,
  };
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Add health check middleware using NestJS method
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();
  instance.use((req, res, next) => {
    console.log(`Middleware called for path: ${req.path}`);
    if (req.path === '/' || req.path === '/health') {
      console.log('Health middleware responding');
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
      return;
    }
    next();
  });

  // Enable CORS
  app.enableCors({
    origin: true, // Allow all origins temporarily for deployment
    credentials: true,
  });

  // Serve static files from public directory
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Student Learning Platform API')
    .setDescription('API documentation for Student Learning Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api`);
}

bootstrap();
