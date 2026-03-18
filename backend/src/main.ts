import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

  // Add health check middleware
  app.use((req, res, next) => {
    if (req.path === '/' || req.path === '/health') {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
      return;
    }
    next();
  });

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
