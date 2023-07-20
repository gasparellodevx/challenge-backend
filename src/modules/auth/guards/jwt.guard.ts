import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { extractTokenFromHeader } from '../utils/extract-token-from-header.util';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = extractTokenFromHeader(request);

    try {
      const payload = this.authService.verifyToken(token);

      request.user = payload;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
