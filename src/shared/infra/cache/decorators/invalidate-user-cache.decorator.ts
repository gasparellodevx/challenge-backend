import { SetMetadata } from '@nestjs/common';

export const INVALIDATE_USER_CACHE = Symbol.for('INVALIDATE_USER_CACHE');

export const InvalidateUserCache = () =>
  SetMetadata(INVALIDATE_USER_CACHE, true);
