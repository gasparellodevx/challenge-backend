import { Inject } from '@nestjs/common';

export const TRANSPORTER_KEY = Symbol.for('TRANSPORTER_KEY');

export const InjectTransporter = () => Inject(TRANSPORTER_KEY);
