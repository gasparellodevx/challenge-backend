import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { type ValidationOptions, IsDate as _IsDate } from 'class-validator';

const DEFAULT_TIME = 'T00:00:00.000Z';

export const IsDate = (options?: ValidationOptions) =>
  applyDecorators(
    _IsDate(options),
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return new Date(`${value}${DEFAULT_TIME}`);
      }

      return value;
    }),
  );
