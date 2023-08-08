import { TokenPayload } from '@/modules/auth/auth.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { INVALIDATE_USER_CACHE } from '../decorators/invalidate-user-cache.decorator';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string {
    const pathname = super.trackBy(context);

    if (!pathname) return;

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: TokenPayload }>();

    const { user, method } = request;

    return user ? `${user.sub}:${pathname}:${method}` : `${pathname}:${method}`;
  }

  public async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const observable = await super.intercept(context, next);

    const user = context
      .switchToHttp()
      .getRequest<Request & { user: TokenPayload }>().user;

    const hasToInvalidateCache = this.reflector.get(
      INVALIDATE_USER_CACHE,
      context.getHandler(),
    );

    if (hasToInvalidateCache && user)
      return observable.pipe(
        tap(async () => {
          const userKeys = await this.cacheManager.store.keys(`${user.sub}:*`);

          await this.cacheManager.store.del(userKeys);
        }),
      );

    return observable;
  }
}
