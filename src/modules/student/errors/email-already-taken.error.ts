import { BaseError } from '@/shared/errors/base.error';

export class EmailAlreadyTakenError extends BaseError {
  httpCode = 409;

  constructor(readonly email: string) {
    super(`Email ${email} already taken`);
  }
}
