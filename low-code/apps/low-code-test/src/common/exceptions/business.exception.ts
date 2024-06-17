import { HttpException, HttpStatus } from '@nestjs/common';
import { BUINESS_ERROR_CODE } from './buiness.error.codes';

type BuinessError = {
  code: number;
  message: string;
};

export class BuinessException extends HttpException {
  constructor(err: BuinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUINESS_ERROR_CODE.COMMON,
        message: err,
      };
    }
    super(err, HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BuinessException({
      code: BUINESS_ERROR_CODE.ACCESS_FORBIDEN,
      message: '抱歉哦，您无此权限',
    });
  }
}
