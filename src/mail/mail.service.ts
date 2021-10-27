import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { resolve } from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/auth/confirm?token=${token}`;

    console.log(__dirname);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', // resolve(__dirname, 'templates', 'confirmation'),
      context: {
        name: user.name,
        url,
      },
    });
  }
}
