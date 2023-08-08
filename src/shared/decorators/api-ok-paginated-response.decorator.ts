import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDTO } from '../dtos/paginated.dto';

export function ApiOkPaginatedResponse<T = any>(dto: Type<T>) {
  return applyDecorators(
    ApiExtraModels(PaginatedDTO, dto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dto) },
              },
            },
          },
        ],
      },
    }),
  );
}
