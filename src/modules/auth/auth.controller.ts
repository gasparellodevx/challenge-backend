import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { OTPLoginDTO } from './dtos/otp-login.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiInternalServerErrorResponse } from '@/shared/decorators/api-internal-server-error-response.decorator';

@ApiBadRequestResponse({
  description: 'Invalid request body',
})
@ApiInternalServerErrorResponse()
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Starts the login process',
    description: 'Sends an OTP to the user',
  })
  @Post('login')
  @HttpCode(200)
  public async login(@Body() loginDto: LoginDTO) {
    await this.authService.sendOTP(loginDto);
  }

  @ApiOperation({
    summary: 'Completes the login process',
    description: 'Returns the access token',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid OTP',
  })
  @Post('login/otp')
  @HttpCode(200)
  public async otpLogin(@Body() otpLoginDto: OTPLoginDTO) {
    const tokens = await this.authService.loginOTP(otpLoginDto);

    if (!tokens) throw new UnauthorizedException();

    return tokens;
  }
}
