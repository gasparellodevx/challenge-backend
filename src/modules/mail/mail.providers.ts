import type { ModuleMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Env } from '@/shared/infra/env/utils/validate-env.util';

import { createTransport } from 'nodemailer';

import { TRANSPORTER_KEY } from './decorators/inject-transporter.decorator';
import { MailService } from './mail.service';

export const IMPORTS: ModuleMetadata['imports'] = [];

export const EXPORTS: ModuleMetadata['exports'] = [MailService];

export const CONTROLLERS: ModuleMetadata['controllers'] = [];

export const PROVIDERS: ModuleMetadata['providers'] = [
  {
    provide: TRANSPORTER_KEY,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService<Env>) => {
      const isDev = ['development', 'test'].includes(
        configService.get('NODE_ENV'),
      );

      return createTransport({
        from: configService.get('EMAIL_FROM'),
        host: configService.get('EMAIL_HOST'),
        port: configService.get('EMAIL_PORT'),
        ...(!isDev && {
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASS'),
          },
        }),
      });
    },
  },
  MailService,
];
