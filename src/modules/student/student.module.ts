import { Module } from '@nestjs/common';
import { CONTROLLERS, EXPORTS, PROVIDERS, IMPORTS } from './student.providers';

@Module({
  imports: IMPORTS,
  controllers: CONTROLLERS,
  providers: PROVIDERS,
  exports: EXPORTS,
})
export class StudentModule {}
