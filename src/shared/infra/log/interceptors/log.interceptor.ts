import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LogActions } from '../log-actions.enum';
import { tap, type Observable, catchError } from 'rxjs';
import { LOG_ACTION_KEY } from '../decorators/log-action.decorator';
import { LogService } from '../log.service';
import { Request } from 'express';
import { TokenPayload } from '@/modules/auth/auth.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector, private logService: LogService) {}

  protected getLogAction(context: ExecutionContext): LogActions {
    return this.reflector.getAllAndOverride<LogActions>(LOG_ACTION_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);
  }

  protected isLoggableRequest(request: ExecutionContext) {
    const logAction = this.getLogAction(request);

    return logAction !== undefined;
  }

  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    if (!this.isLoggableRequest(context)) return next.handle();

    const logAction = this.getLogAction(context);

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: TokenPayload }>();

    const executeLog = async (error?: Error) => {
      await this.logService.createLog({
        action: logAction,
        userId: request.user?.sub,
        extra: JSON.stringify(request.query),
        error: error?.message,
      });
    };

    return next.handle().pipe(
      catchError((error) => {
        executeLog(error);

        throw error;
      }),

      tap(() => {
        executeLog().catch((error) => {
          console.error(error);
        });
      }),
    );
  }
}
