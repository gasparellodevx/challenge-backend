import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@prisma/client';
import { IsEmail, MaxLength } from 'class-validator';

export class FindStudentByOtpAndEmailDTO
  implements Pick<Student, 'email' | 'otp'>
{
  @ApiProperty({
    example: 'test@test.com',
    description: 'student email',
  })
  @MaxLength(255, {
    message: 'email must have a maximum of 255 characters',
  })
  @IsEmail(
    {},
    {
      message: 'email must be a valid email',
    },
  )
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'OTP code sent to student email',
  })
  otp: string;
}
