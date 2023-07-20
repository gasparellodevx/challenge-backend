import type { ModuleMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';

import type { Env } from '@/shared/infra/env/utils/validate-env.util';

import { MailModule } from '../mail/mail.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OTPProcessor, OTP_QUEUE } from './tasks/otp.processor';
import { JWTGuard } from './guards/jwt.guard';
import { StudentModule } from '../student/student.module';

export const IMPORTS: ModuleMetadata['imports'] = [
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService<Env>) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get('JWT_EXPIRATION_TIME'),
      },
    }),
  }),
  BullModule.registerQueue({
    name: OTP_QUEUE,
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: {
        age: 1000 * 60 * 60 * 24,
      },
    },
  }),
  MailModule,
  StudentModule,
];

export const EXPORTS: ModuleMetadata['exports'] = [AuthService, JWTGuard];

export const CONTROLLERS: ModuleMetadata['controllers'] = [AuthController];

export const PROVIDERS: ModuleMetadata['providers'] = [
  AuthService,
  JWTGuard,
  OTPProcessor,
];
