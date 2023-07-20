import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@prisma/client';

export class StudentDTO implements Omit<Student, 'otp' | 'otpExpires'> {
  @ApiProperty({
    description: 'student id',
    example: '4dcf7044-56e8-431c-9e29-18c30c320b2d',
  })
  id: string;

  @ApiProperty({
    description: 'student name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'student email',
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    description: 'student last access',
    example: '2021-07-01T00:00:00.000Z',
  })
  lastAccess: Date;

  @ApiProperty({
    description: 'student created at date',
    example: '2021-07-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'student updated at date',
    example: '2021-07-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
