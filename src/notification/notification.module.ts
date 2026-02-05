import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationProcessor } from './notification.processor';
import { EmailChannel } from './channels/email.channel';
import { TemplateService } from './template.service';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationProcessor,
    EmailChannel,
    TemplateService,
  ],
})
export class NotificationModule {}
