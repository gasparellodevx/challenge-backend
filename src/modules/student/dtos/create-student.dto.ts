import { ApiProperty } from '@nestjs/swagger';
import type { Student } from '@prisma/client';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class CreateStudentDTO implements Pick<Student, 'name' | 'email'> {
  @ApiProperty({
    example: 'John Doe',
    description: 'student name',
  })
  @Length(2, 255, {
    message: 'name must be between 2 and 255 characters',
  })
  @IsString({
    message: 'name must be a string',
  })
  name: string;

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
}
