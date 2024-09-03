import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserModule } from './user/user.model';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { TransFormInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';

declare const module: any;

async function bootstrap() {
  // const app = await NestFactory.create(UserModule);
  const app = await NestFactory.create(AppModule);
  // 统一响应格式
  app.useGlobalInterceptors(new TransFormInterceptor());
  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 创建文档
  generateDocument(app);

  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3002);
}
bootstrap();
