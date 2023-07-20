import { IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationOptionsDTO {
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @Max(50)
  @Min(10)
  @Type(() => Number)
  @IsOptional()
  limit?: number;
}
