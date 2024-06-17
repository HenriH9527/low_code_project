// http.exception.filter.ts => Catch 的参数为 HttpException 将只捕获 HTTP 相关的异常错误

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BuinessException } from './business.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    // 处理业务异常
    if (exception instanceof BuinessException) {
      const error = exception.getResponse();
      console.log('ererererrer', error);

      response.status(HttpStatus.OK).json({
        data: null,
        status: error['code'],
        extra: {},
        message: error['message'],
        success: false,
      });
      return;
    }

    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}
