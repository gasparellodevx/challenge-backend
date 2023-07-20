import { HttpException } from '@nestjs/common';
import { BaseError } from '../base.error';

export function baseErrorToHttpException(error: BaseError): HttpException {
  const DEFAULT_HTTP_CODE = 500;

  return new HttpException(
    error?.message,
    error?.httpCode ?? DEFAULT_HTTP_CODE,
  );
}
