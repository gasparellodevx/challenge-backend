import { Module } from '@nestjs/common';
import { CONTROLLERS, IMPORTS, EXPORTS, PROVIDERS } from './course.providers';

@Module({
  imports: IMPORTS,
  controllers: CONTROLLERS,
  providers: PROVIDERS,
  exports: EXPORTS,
})
export class CourseModule {}
