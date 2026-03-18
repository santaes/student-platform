import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Test')
@Controller('test')
export class TestController {
  @Get()
  @ApiOperation({ summary: 'Test endpoint' })
  getTest() {
    return {
      message: 'Test endpoint working',
      timestamp: new Date().toISOString(),
    };
  }
}
