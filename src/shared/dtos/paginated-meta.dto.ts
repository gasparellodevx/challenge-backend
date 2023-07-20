import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class PaginatedMetaDTO {
  @ApiProperty({
    description: 'Current page',
  })
  @Min(1)
  page: number;

  @ApiProperty({
    description: 'Number of items in each page',
  })
  @Max(50)
  @Min(10)
  limit: number;

  @ApiProperty({
    description: 'Total number of items',
  })
  totalCount: number;

  @ApiProperty({
    description: 'Total number of pages',
  })
  @Min(1)
  totalPages: number;
}
