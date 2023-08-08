import { Inject } from '@nestjs/common';

export const LOGGER_KEY = Symbol.for('LOGGER_KEY');

export const InjectLogger = () => Inject(LOGGER_KEY);
