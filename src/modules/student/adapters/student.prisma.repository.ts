import { Injectable } from '@nestjs/common';
import { IStudentRepository } from '../ports/student.repository';
import { PrismaService } from '@/shared/infra/db/prisma.service';
import { Either, left, right } from '@/shared/types/either';
import { CreateStudentDTO } from '../dtos/create-student.dto';
import { FindStudentByOtpAndEmailDTO } from '../dtos/find-student-by-otp-and-email.dto';
import { EmailAlreadyTakenError } from '../errors/email-already-taken.error';
import { StudentNotFoundError } from '../errors/student-not-found.error';
import type { Student } from '@prisma/client';
import { UpdateStudentDTO } from '../dtos/update-student.dto';

@Injectable()
export class StudentPrismaRepository implements IStudentRepository {
  constructor(private prisma: PrismaService) {}

  public async createStudent(
    studentDto: CreateStudentDTO,
  ): Promise<Either<EmailAlreadyTakenError, Student>> {
    const student = await this.prisma.student.findUnique({
      where: {
        email: studentDto.email,
      },
    });

    if (student) return left(new EmailAlreadyTakenError(student.email));

    return right(
      await this.prisma.student.create({
        data: studentDto,
      }),
    );
  }

  public async updateStudent(
    id: string,
    studentDto: UpdateStudentDTO,
  ): Promise<Either<StudentNotFoundError, Student>> {
    const student = await this.prisma.student.update({
      where: {
        id,
      },
      data: studentDto,
    });

    if (!student) return left(new StudentNotFoundError(id));

    return right(student);
  }

  public async findStudentByEmail(
    email: string,
  ): Promise<Either<StudentNotFoundError, Student>> {
    const student = await this.prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (!student) return left(new StudentNotFoundError(email));

    return right(student);
  }

  public async findStudentByOtpAndEmail(
    findDto: FindStudentByOtpAndEmailDTO,
  ): Promise<Either<StudentNotFoundError, Student>> {
    const student = await this.prisma.student.findUnique({
      where: {
        email: findDto.email,
        otp: findDto.otp,
        otpExpires: {
          gte: new Date(),
        },
      },
    });

    if (!student) return left(new StudentNotFoundError(findDto.email));

    return right(student);
  }
}
