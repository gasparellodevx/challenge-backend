import type { ModuleMetadata } from '@nestjs/common';
import { PrismaModule } from '../db/prisma.module';
import { LogInterceptor } from './interceptors/log.interceptor';
import { LogController } from './log.controller';
import { ILogRepository } from './ports/log.repository';
import { LogPrismaRepository } from './adapters/log.prisma.repository';
import { LogService } from './log.service';
import { ConfigService } from '@nestjs/config';
import winston from 'winston';
import type { Env } from '../env/utils/validate-env.util';
import { LOGGER_KEY } from './decorators/inject-logger.decorator';

export const IMPORTS: ModuleMetadata['imports'] = [PrismaModule];

export const EXPORTS: ModuleMetadata['exports'] = [LogInterceptor];

export const CONTROLLERS: ModuleMetadata['controllers'] = [LogController];

export const PROVIDERS: ModuleMetadata['providers'] = [
  {
    inject: [ConfigService],
    provide: LOGGER_KEY,
    useFactory: (configService: ConfigService<Env>) => {
      const isDev = configService.get('NODE_ENV') === 'development';

      return winston.createLogger({
        transports: [
          new winston.transports.File({
            filename: 'logs/app.log',
          }),
          ...(isDev ? [new winston.transports.Console()] : []),
        ],
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        level: isDev ? 'debug' : 'info',
      });
    },
  },
  {
    provide: ILogRepository,
    useClass: LogPrismaRepository,
  },
  LogInterceptor,
  LogService,
];
