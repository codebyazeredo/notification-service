import { Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';
import { randomUUID } from 'crypto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post
    async create(@Body() dto: CreateNotificationDto) {
        await this.notificationService.enqueue({
            ...dto,
            correlationId: randomUUID(),
        });

        return {
            status: 'Adicionado a fila de envio com sucesso',
        }
    }
}
