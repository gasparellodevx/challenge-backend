import { ApiProperty } from '@nestjs/swagger';
import { CourseType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateCouseDTO {
  @Length(3, 255)
  @IsString({
    message: 'name must be a string',
  })
  name: string;

  @IsUrl()
  @IsOptional()
  thumbnail: string | null;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Length(3, 64)
  @IsString()
  category: string;

  @IsEnum(CourseType, {
    message: `type must be one of the following values: ${Object.values(
      CourseType,
    ).join(', ')}`,
  })
  @ApiProperty({
    enum: CourseType,
  })
  type: CourseType;

  @IsUrl()
  accessUrl: string;

  @IsUrl()
  supportUrl: string;
}
