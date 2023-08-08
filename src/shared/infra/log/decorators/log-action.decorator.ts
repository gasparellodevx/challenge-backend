import { SetMetadata } from '@nestjs/common';
import { LogActions } from '../log-actions.enum';

export const LOG_ACTION_KEY = Symbol('LOG_ACTION_KEY');

export const LogAction = (action: LogActions) =>
  SetMetadata(LOG_ACTION_KEY, action);
