import { ApiProperty } from '@nestjs/swagger';
import { LogActions } from '../log-actions.enum';

export class LogDTO {
  @ApiProperty({
    description: 'The log id',
    example: '4dcf7044-56e8-431c-9e29-18c30c320b2d',
  })
  id: string;

  @ApiProperty({
    description: 'The date when action was executed',
  })
  executedAt: Date;

  @ApiProperty({
    description: 'The action executed',
    enum: LogActions,
  })
  action: LogActions;

  @ApiProperty({
    description: 'The extra data',
    example: {
      page: 1,
      limit: 10,
    },
    additionalProperties: {
      anyOf: [
        {
          type: 'object',
        },
        {
          type: 'string',
        },
        {
          type: 'number',
        },
        {
          type: 'boolean',
        },
      ],
    },
  })
  extra?: unknown;

  @ApiProperty({
    description: 'The error message',
    example: 'Bad request exception',
  })
  error?: string;
}
