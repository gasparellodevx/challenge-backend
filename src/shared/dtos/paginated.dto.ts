import { ApiProperty } from '@nestjs/swagger';
import { PaginatedMetaDTO } from './paginated-meta.dto';

export class PaginatedDTO<T> {
  @ApiProperty({
    description: 'Pagination metadata',
  })
  meta: PaginatedMetaDTO;

  @ApiProperty({
    isArray: true,
  })
  data: T[];
}
