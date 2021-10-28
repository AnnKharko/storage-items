import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import templatesInfo from '../templates';
import { ConfigService } from '@nestjs/config';
import { GraphQLError } from 'graphql';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  contextExtension = {
    frontendUrl: this.configService.get('FRONTEND_URL'),
  };

  async sendUserMail(email, action, context) {
    try {
      const templateInfo = templatesInfo[action];
      Object.assign(context, this.contextExtension);
      await this.mailerService.sendMail({
        to: email,
        subject: templateInfo.subject,
        template: templateInfo.templateName,
        context,
      });
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  }
}
