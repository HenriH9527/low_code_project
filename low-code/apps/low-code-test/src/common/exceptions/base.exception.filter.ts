// base.exception.filter => Catch 的参数为空时，默认捕获所有异常

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  ServiceUnavailableException,
} from '@nestjs/common';
import { timeStamp } from 'console';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 非 HTTP 标准异常的处理
    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timeStamp: new Date().toISOString(),
      path: request.url,
      message: new ServiceUnavailableException().getResponse(),
    });
  }
}
