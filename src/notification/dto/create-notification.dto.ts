import { IsEmail, IsObject, IsString, IsEnum } from 'class-validator';

export class CreateNotificationDto {
    @IsEnum(['email'])
    channel: 'email';

    @IsEmail()
    to: string;

    @IsString()
    template: string;

    @IsObject()
    payload: Record<string, any>;
}