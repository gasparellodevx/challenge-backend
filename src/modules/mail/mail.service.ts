import { Injectable } from '@nestjs/common';
import { InjectTransporter } from './decorators/inject-transporter.decorator';
import { SendMailOptions, Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(@InjectTransporter() private transporter: Transporter) {}

  public async sendMail(options: SendMailOptions) {
    return this.transporter.sendMail({
      ...this.transporter.options,
      ...options,
    });
  }
}
