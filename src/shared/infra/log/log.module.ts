import { Global, Module } from '@nestjs/common';
import { IMPORTS } from '@/modules/student/student.providers';
import { CONTROLLERS, EXPORTS, PROVIDERS } from './log.providers';

@Global()
@Module({
  imports: IMPORTS,
  controllers: CONTROLLERS,
  providers: PROVIDERS,
  exports: EXPORTS,
})
export class LogModule {}
