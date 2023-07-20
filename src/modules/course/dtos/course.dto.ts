import { ApiProperty } from '@nestjs/swagger';
import { CourseType } from '@prisma/client';

export class CourseDTO {
  @ApiProperty({
    description: 'Course id',
    example: 'dcf7044-56e8-431c-9e29-18c30c320b2d',
  })
  id: string;

  @ApiProperty({
    description: 'Course name',
    example: 'Course name',
  })
  name: string;

  @ApiProperty({
    description: 'Course thumbnail',
    example: 'https://example.com/thumbnail.png',
  })
  thumbnail?: string;

  @ApiProperty({
    description: 'Course description',
    example: 'Course description',
  })
  description: string;

  @ApiProperty({
    description: 'Course category',
    example: 'Category',
  })
  category: string;

  @ApiProperty({
    description: 'Course type',
    enum: CourseType,
  })
  type: CourseType;

  @ApiProperty({
    description: 'Course access url',
    example: 'https://example.com/access',
  })
  accessUrl: string;

  @ApiProperty({
    description: 'Course support url',
    example: 'https://example.com/support',
  })
  supportUrl: string;

  @ApiProperty({
    description: 'Course student id',
    example: 'dcf7044-56e8-431c-9e29-18c30c320b2d',
  })
  studentId: string;

  @ApiProperty({
    description: 'Course creation date',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Course last update date',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
