import { Processor, Process } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationJob } from './interfaces/notification-job.interface';
import { EmailChannel } from './channels/email.channel';

@Processor('notifications')
export class NotificationProcessor {
    constructor(private readonly emailChannel: EmailChannel) {}

    @Process('send-notification')
    async handle(job: Job<NotificationJob>) {
        const { channel } = job.data;

        if (channel === 'email') {
            await this.emailChannel.send(job.data);
            return;
        }

        throw new Error(`Canal de notificação desconhecido: ${channel}`);
    }
}