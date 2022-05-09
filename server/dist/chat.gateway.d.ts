import { Server, Socket } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import ChatSenderTypes from './types/chatSender.types';
export declare class ChatGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    private usersService;
    private trainersService;
    private chatsService;
    private userCategoriesService;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleJoinChat(client: Socket, room: string): Promise<void>;
    handleChatMessage(client: Socket, message: {
        sender: ChatSenderTypes;
        room: string;
        text: string;
        imgIds: number[];
    }): Promise<void>;
    handleLeaveChat(client: Socket, room: string): void;
    handleJoinLounge(client: Socket, room: string): Promise<void>;
    handleLeaveLounge(client: Socket, room: string): Promise<void>;
}
