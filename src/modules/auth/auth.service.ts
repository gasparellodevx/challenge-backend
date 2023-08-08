import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';
import { InjectQueue } from '@nestjs/bull';
import { OTP_QUEUE, OtpJobData } from './tasks/otp.processor';
import { type Queue } from 'bull';
import { OTPLoginDTO } from './dtos/otp-login.dto';
import { Student } from '@prisma/client';

export type TokenPayload = {
  email: Student['email'];
  sub: Student['id'];
};

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
    @InjectQueue(OTP_QUEUE) private mailQueue: Queue<OtpJobData>,
  ) {}

  public async sendOTP(loginDto: LoginDTO) {
    await this.mailQueue.add(loginDto);
  }

  public async validateStudent(
    otpLoginDto: OTPLoginDTO,
  ): Promise<TokenPayload | null> {
    const studentOrError = await this.studentService.findStudentByOtpAndEmail(
      otpLoginDto,
    );

    if (studentOrError.isLeft()) return null;

    await this.studentService.updateLastAccess(studentOrError.value.id);

    return {
      email: studentOrError.value.email,
      sub: studentOrError.value.id,
    };
  }

  public async loginOTP(loginDto: OTPLoginDTO) {
    const payload = await this.validateStudent(loginDto);

    if (!payload) return null;

    return {
      payload,
      access_token: this.createToken(payload),
    };
  }

  public createToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }

  public verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }
}
