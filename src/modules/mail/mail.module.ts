import { Module } from '@nestjs/common';
import { IMPORTS, CONTROLLERS, PROVIDERS, EXPORTS } from './mail.providers';

@Module({
  imports: IMPORTS,
  controllers: CONTROLLERS,
  providers: PROVIDERS,
  exports: EXPORTS,
})
export class MailModule {}
