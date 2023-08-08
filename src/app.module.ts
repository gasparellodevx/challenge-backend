import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/infra/db/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  type Env,
  validateEnv,
} from './shared/infra/env/utils/validate-env.util';
import { CacheModule } from '@nestjs/cache-manager';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';
import { StudentModule } from './modules/student/student.module';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { LogModule } from './shared/infra/log/log.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCacheInterceptor } from './shared/infra/cache/interceptors/http-cache.interceptor';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validate: validateEnv,
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => {
        const url = new URL(config.get('REDIS_URL'));
        return {
          store: ioRedisStore,
          instanceConfig: {
            host: url.hostname,
            port: Number(url.port),
            password: url.password,
            db: Number(url.pathname.split('/')[1]),
          },
          ttl: config.get('CACHE_TTL'),
        };
      },
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        url: config.get('BULL_REDIS_URL'),
      }),
    }),
    LogModule,
    AuthModule,
    StudentModule,
    CourseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule {}
