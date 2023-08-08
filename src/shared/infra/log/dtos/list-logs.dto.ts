import { PaginationOptionsDTO } from '@/shared/dtos/pagination-option.dto';
import { IsBefore } from '@/shared/validators/decorators/is-before.decorator';
import { IsDate } from '@/shared/validators/decorators/is-date.decorator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ListLogsDTO extends PaginationOptionsDTO {
  @ApiHideProperty()
  userId: string;

  @ApiProperty({
    description: 'Filter the logs since this date',
    example: '2021-01-01',
  })
  @IsBefore('until')
  @IsDate({
    message: 'since must be a valid date',
  })
  since: Date;

  @ApiProperty({
    description: 'Filter the logs until this date',
    example: '2021-01-02',
  })
  @IsDate({
    message: 'until must be a valid date',
  })
  until?: Date;
}
