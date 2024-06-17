import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: 'user',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return 'i am old one';
  }

  @Get()
  @Version('2')
  findAll2() {
    return 'i am new one';
  }
}
