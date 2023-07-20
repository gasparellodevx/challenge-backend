import { BaseError } from '@/shared/errors/base.error';

export class CourseNotFoundError extends BaseError {
  httpCode = 404;

  constructor(readonly id: string) {
    super(`Course with id ${id} not found`);
  }
}
