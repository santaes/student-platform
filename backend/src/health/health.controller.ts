import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  constructor() {
    console.log('HealthController instantiated successfully');
  }

  @Get()
  getHealth() {
    console.log('Health endpoint called');
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('health')
  getHealthAlt() {
    console.log('Health/health endpoint called');
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
