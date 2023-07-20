import type { ModuleMetadata } from '@nestjs/common';
import { IStudentRepository } from './ports/student.repository';
import { StudentPrismaRepository } from './adapters/student.prisma.repository';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PrismaModule } from '@/shared/infra/db/prisma.module';

export const IMPORTS: ModuleMetadata['imports'] = [PrismaModule];

export const EXPORTS: ModuleMetadata['exports'] = [StudentService];

export const CONTROLLERS: ModuleMetadata['controllers'] = [StudentController];

export const PROVIDERS: ModuleMetadata['providers'] = [
  StudentService,
  {
    provide: IStudentRepository,
    useClass: StudentPrismaRepository,
  },
];
