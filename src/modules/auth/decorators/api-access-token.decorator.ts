import { ApiBearerAuth } from '@nestjs/swagger';
import { ACCESS_TOKEN_SECURITY_NAME } from '../auth.constants';

export const ApiAccessToken = () => ApiBearerAuth(ACCESS_TOKEN_SECURITY_NAME);
