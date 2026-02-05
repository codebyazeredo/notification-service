export interface NotificationJob {
    channel: 'email';
    to: string;
    template: string;
    payload: Record<string, any>;
    correlationId: string;
}