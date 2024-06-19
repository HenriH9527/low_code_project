import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { BuinessException } from '../src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'user',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }

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

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.appService.getHello();
  }

  @Get('findBuinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BuinessException('你这个参数出错了');
    }
    return this.appService.findAll();
  }
}
