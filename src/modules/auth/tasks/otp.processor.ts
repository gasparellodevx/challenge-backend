import { MailService } from '@/modules/mail/mail.service';
import { StudentService } from '@/modules/student/student.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendMailOptions } from 'nodemailer';
import { generateOTP } from '../utils/generate-otp.util';

export const OTP_QUEUE = 'otp';

export type OtpJobData = {
  email: string;
};

const TEST_OTP = '123456';

@Processor(OTP_QUEUE)
export class OTPProcessor {
  constructor(
    private mailService: MailService,
    private studentService: StudentService,
  ) {}

  @Process()
  public async handleOTP(job: Job<OtpJobData>) {
    const { email } = job.data;

    const studentOrError = await this.studentService.findStudentByEmail(email);

    if (studentOrError.isLeft()) return;

    const isTest = process.env.NODE_ENV === 'test';

    let otp = TEST_OTP;

    if (!isTest) otp = generateOTP();

    await this.studentService.registerOTP(studentOrError.value.id, otp);

    await this.mailService.sendMail(
      this.getMailOptions({
        email,
        otp,
        name: studentOrError.value.name,
      }),
    );
  }

  private getMailOptions(options: {
    email: string;
    otp: string;
    name: string;
  }): SendMailOptions {
    return {
      to: options.email,
      subject: 'OTP for login',
      text: `Hello ${options.name}, your OTP is ${options.otp}`,
    };
  }
}
