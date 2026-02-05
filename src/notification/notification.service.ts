import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { NotificationJob } from './interfaces/notification-job.interface';

@Injectable()
export class NotificationService {
    constructor(@InjectQueue('notifications') private readonly notificationQueue: Queue) {}

     async enqueue(job: NotificationJob) {
        await this.notificationQueue.add('send-notification', job, {
            attempts: 5,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
            removeOnComplete: true,
            removeOnFail: false,
        });
     }
}
