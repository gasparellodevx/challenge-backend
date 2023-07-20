import { Injectable } from '@nestjs/common';
import { IStudentRepository } from './ports/student.repository';
import { FindStudentByOtpAndEmailDTO } from './dtos/find-student-by-otp-and-email.dto';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { UpdateStudentDTO } from './dtos/update-student.dto';
import { Student } from '@prisma/client';
import { OTP_EXPIRES_IN_MS } from './student.constants';

@Injectable()
export class StudentService {
  constructor(private studentRepository: IStudentRepository) {}

  public async findStudentByOtpAndEmail(findDto: FindStudentByOtpAndEmailDTO) {
    return this.studentRepository.findStudentByOtpAndEmail(findDto);
  }

  public async createStudent(createDto: CreateStudentDTO) {
    return this.studentRepository.createStudent(createDto);
  }

  public async updateStudent(id: Student['id'], updateDto: UpdateStudentDTO) {
    return this.studentRepository.updateStudent(id, updateDto);
  }

  public async registerOTP(id: Student['id'], otp: Student['otp']) {
    return this.studentRepository.updateStudent(id, {
      otp,
      otpExpires: new Date(Date.now() + OTP_EXPIRES_IN_MS),
    });
  }

  public async findStudentByEmail(email: Student['email']) {
    return this.studentRepository.findStudentByEmail(email);
  }

  public async updateLastAccess(id: Student['id']) {
    return this.studentRepository.updateStudent(id, {
      lastAccess: new Date(),
      otp: null,
      otpExpires: null,
    });
  }
}
