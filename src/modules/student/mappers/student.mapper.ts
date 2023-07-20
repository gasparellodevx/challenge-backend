import { Student } from '@prisma/client';
import { StudentDTO } from '../dtos/student.dto';

export function toStudentDTO(student: Student): StudentDTO {
  return {
    id: student.id,
    email: student.email,
    name: student.name,
    lastAccess: student.lastAccess,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  };
}
