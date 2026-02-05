import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationJob } from './interfaces/notification-job.interface';
import { EmailChannel } from './channels/email.channel';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  constructor(
    private readonly emailChannel: EmailChannel,
  ) {
    super();
  }

  async process(job: Job<NotificationJob>): Promise<void> {
    const { channel } = job.data;

    if (channel === 'email') {
      await this.emailChannel.send(job.data);
      return;
    }

    throw new Error(`Canal de notificação desconhecido: ${channel}`);
  }
}
