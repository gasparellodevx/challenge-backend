import { BaseError } from '@/shared/errors/base.error';

export class StudentNotFoundError extends BaseError {
  httpCode = 404;

  constructor(readonly idOrEmail: string) {
    super(`Student with id or email ${idOrEmail} not found`);
  }
}
