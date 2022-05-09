import { Chat } from '../../chats/entities/chat.entity';
export declare class Img {
    id: number;
    url: string;
    chatId: number;
    userId: number;
    trainerId: number;
    createdAt: Date;
    updatedAt: Date;
    chat: Chat;
}
