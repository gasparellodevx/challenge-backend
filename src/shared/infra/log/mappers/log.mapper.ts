import { Log } from '@prisma/client';
import { LogDTO } from '../dtos/log.dto';

export function toLogDTO({ userId: _, ...log }: Log): LogDTO {
  return {
    ...(log as LogDTO),
    extra: log.extra ? JSON.parse(log.extra) : null,
  };
}
