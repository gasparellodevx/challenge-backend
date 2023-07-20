import { IsUUID } from 'class-validator';

export class IdDTO {
  @IsUUID('4', {
    message: 'Invalid id provided',
  })
  id: string;
}
