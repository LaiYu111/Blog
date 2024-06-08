import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/system')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version')
  getHello(): string {
    return '1';
  }
}
