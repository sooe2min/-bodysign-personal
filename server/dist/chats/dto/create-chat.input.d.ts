import ChatSenderTypes from 'src/types/chatSender.types';
export declare class CreateChatInput {
    userId: number;
    trainerId: number;
    text: string;
    sender: ChatSenderTypes;
    imgIds?: number[];
}
