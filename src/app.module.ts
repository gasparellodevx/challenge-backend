import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/infra/db/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  type Env,
  validateEnv,
} from './shared/infra/env/utils/validate-env.util';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { StudentModule } from './modules/student/student.module';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validate: validateEnv,
      isGlobal: true,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        store: redisStore as any,
        url: config.get('REDIS_URL'),
      }),
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        url: config.get('BULL_REDIS_URL'),
      }),
    }),
    AuthModule,
    StudentModule,
    CourseModule,
  ],
})
export class AppModule {}
