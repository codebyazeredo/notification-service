import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotificationJob } from '../interfaces/notification-job.interface';
import { TemplateService } from '../../templates/template.service';

@Injectable()
export class EmailChannel {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly templateService: TemplateService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(job: NotificationJob) {
    if (process.env.EMAIL_ENABLED !== 'true') {
      return;
    }

    const html = await this.templateService.render(
      job.template,
      job.payload,
    );

    await this.transporter.sendMail({
      to: job.to,
      subject: `Notificação - ${job.template}`,
      html,
    });
  }
}
