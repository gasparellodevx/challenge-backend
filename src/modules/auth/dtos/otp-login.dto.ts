import { IsAlphanumeric, Length } from 'class-validator';
import { LoginDTO } from './login.dto';
import { OTP_LENGTH } from '../auth.constants';

export class OTPLoginDTO extends LoginDTO {
  @Length(OTP_LENGTH, OTP_LENGTH, {
    message: `otp must be exactly ${OTP_LENGTH} characters`,
  })
  @IsAlphanumeric('en-US', {
    message: 'otp must have only numbers and letters',
  })
  otp: string;
}
