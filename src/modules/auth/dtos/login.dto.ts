import { IsEmail, MaxLength } from 'class-validator';

export class LoginDTO {
  @MaxLength(255, {
    message: 'email must be shorter than or equal to 255 characters',
  })
  @IsEmail(
    {},
    {
      message: 'email must be a valid email',
    },
  )
  email: string;
}
