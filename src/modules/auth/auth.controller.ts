import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService, TokenPayload } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { OTPLoginDTO } from './dtos/otp-login.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiInternalServerErrorResponse } from '@/shared/decorators/api-internal-server-error-response.decorator';
import { LogAction } from '@/shared/infra/log/decorators/log-action.decorator';
import { LogActions } from '@/shared/infra/log/log-actions.enum';
import { Request } from 'express';

@ApiBadRequestResponse({
  description: 'Invalid request body',
})
@ApiInternalServerErrorResponse()
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @LogAction(LogActions.LOGIN)
  @ApiOperation({
    summary: 'Starts the login process',
    description: 'Sends an OTP to the user',
  })
  @Post('login')
  @HttpCode(200)
  public async login(@Body() loginDto: LoginDTO) {
    await this.authService.sendOTP(loginDto);
  }

  @LogAction(LogActions.OTP_LOGIN)
  @ApiOperation({
    summary: 'Completes the login process',
    description: 'Returns the access token',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid OTP',
  })
  @Post('login/otp')
  @HttpCode(200)
  public async otpLogin(
    @Body() otpLoginDto: OTPLoginDTO,
    @Req() req: Request & { user: TokenPayload },
  ) {
    const result = await this.authService.loginOTP(otpLoginDto);

    if (!result) throw new UnauthorizedException();

    const { payload, ...tokens } = result;

    req.user = payload;

    return tokens;
  }
}
