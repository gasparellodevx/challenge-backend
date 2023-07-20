import { PrismaModule } from '@/shared/infra/db/prisma.module';
import type { ModuleMetadata } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { ICourseRepository } from './ports/course.repository';
import { CoursePrismaRepository } from './adapters/course.prisma.repository';

export const IMPORTS: ModuleMetadata['imports'] = [PrismaModule];

export const EXPORTS: ModuleMetadata['exports'] = [CourseService];

export const CONTROLLERS: ModuleMetadata['controllers'] = [CourseController];

export const PROVIDERS: ModuleMetadata['providers'] = [
  CourseService,
  { provide: ICourseRepository, useClass: CoursePrismaRepository },
];
