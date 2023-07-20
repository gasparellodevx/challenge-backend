import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../auth.service';

export const User = createParamDecorator(
  (data: keyof TokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: TokenPayload }>();
    return data ? request.user?.[data] : request.user;
  },
);
