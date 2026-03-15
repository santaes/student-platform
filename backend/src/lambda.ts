import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedApp: any;

export const handler = async (event: any, context: any) => {
  if (!cachedApp) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    
    app.enableCors({
      origin: '*',
      credentials: true,
    });
    
    await app.init();
    cachedApp = expressApp;
  }
  
  return cachedApp(event, context);
};
