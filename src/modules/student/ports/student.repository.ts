import type { Either } from '@/shared/types/either';
import type { CreateStudentDTO } from '../dtos/create-student.dto';
import type { EmailAlreadyTakenError } from '../errors/email-already-taken.error';
import type { Student } from '@prisma/client';
import type { StudentNotFoundError } from '../errors/student-not-found.error';
import type { FindStudentByOtpAndEmailDTO } from '../dtos/find-student-by-otp-and-email.dto';
import { UpdateStudentDTO as UpdateDTO } from '../dtos/update-student.dto';

type UpdateStudentDTO = UpdateDTO & {
  otp?: Student['otp'];
  otpExpires?: Student['otpExpires'];
  lastAccess?: Student['lastAccess'];
};

export abstract class IStudentRepository {
  abstract createStudent(
    student: CreateStudentDTO,
  ): Promise<Either<EmailAlreadyTakenError, Student>>;

  abstract updateStudent(
    id: Student['id'],
    student: UpdateStudentDTO,
  ): Promise<Either<StudentNotFoundError, Student>>;

  abstract findStudentByEmail(
    email: Student['email'],
  ): Promise<Either<StudentNotFoundError, Student>>;

  abstract findStudentByOtpAndEmail(
    findDto: FindStudentByOtpAndEmailDTO,
  ): Promise<Either<StudentNotFoundError, Student>>;
}
