import { ApiInternalServerErrorResponse as Decorator } from '@nestjs/swagger';

export const ApiInternalServerErrorResponse = () =>
  Decorator({
    description: 'Something went wrong while processing the request',
  });
