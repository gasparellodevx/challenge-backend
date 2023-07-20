import { Global, Module } from '@nestjs/common';
import { CONTROLLERS, EXPORTS, IMPORTS, PROVIDERS } from './auth.providers';

@Global()
@Module({
  imports: IMPORTS,
  controllers: CONTROLLERS,
  providers: PROVIDERS,
  exports: EXPORTS,
})
export class AuthModule {}
