"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateWay = void 0;
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const chats_service_1 = require("./chats/chats.service");
const trainers_service_1 = require("./trainers/trainers.service");
const user_categories_service_1 = require("./user-categories/user-categories.service");
const users_service_1 = require("./users/users.service");
let ChatGateWay = class ChatGateWay {
    constructor() {
        this.logger = new common_1.Logger();
    }
    afterInit(server) {
    }
    handleDisconnect(client) {
    }
    handleConnection(client, ...args) {
        this.logger.log('Client connected...');
    }
    async handleJoinChat(client, room) {
        const [userId, trainerId] = room.split('|');
        if (isNaN(parseInt(userId)) || isNaN(parseInt(trainerId))) {
            client.disconnect(true);
            return;
        }
        const chats = await this.chatsService.findRecentChatByUserIdAndTrainerId(parseInt(userId), parseInt(trainerId));
        client.join(room);
        this.server.to(trainerId).emit('newMessageFromClient', userId);
        client.emit('joinedRoom', chats);
    }
    async handleChatMessage(client, message) {
        const [userId, trainerId] = message.room.split('|');
        if (isNaN(parseInt(userId)) || isNaN(parseInt(trainerId))) {
            client.disconnect(true);
            return;
        }
        const { text, sender, imgIds } = message;
        const chat = await this.chatsService.create({
            userId: parseInt(userId),
            trainerId: parseInt(trainerId),
            text,
            sender,
            imgIds,
        });
        this.server.to(message.room).emit('receiveChat', chat);
    }
    handleLeaveChat(client, room) {
        client.leave(room);
        client.emit('leftRoom');
        client.disconnect(true);
    }
    async handleJoinLounge(client, room) {
        if (isNaN(parseInt(room))) {
            client.disconnect(true);
            return;
        }
        const loungeInfo = await this.userCategoriesService.getLoungeInfo(parseInt(room));
        client.join(room);
        client.emit('joinedLounge', loungeInfo);
    }
    async handleLeaveLounge(client, room) {
        client.leave(room);
        client.emit('leftLounge');
        client.disconnect(true);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateWay.prototype, "server", void 0);
__decorate([
    common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService)),
    __metadata("design:type", users_service_1.UsersService)
], ChatGateWay.prototype, "usersService", void 0);
__decorate([
    common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService)),
    __metadata("design:type", trainers_service_1.TrainersService)
], ChatGateWay.prototype, "trainersService", void 0);
__decorate([
    common_1.Inject(common_1.forwardRef(() => chats_service_1.ChatsService)),
    __metadata("design:type", chats_service_1.ChatsService)
], ChatGateWay.prototype, "chatsService", void 0);
__decorate([
    common_1.Inject(common_1.forwardRef(() => user_categories_service_1.UserCategoriesService)),
    __metadata("design:type", user_categories_service_1.UserCategoriesService)
], ChatGateWay.prototype, "userCategoriesService", void 0);
__decorate([
    websockets_1.SubscribeMessage('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateWay.prototype, "handleJoinChat", null);
__decorate([
    websockets_1.SubscribeMessage('sendChat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateWay.prototype, "handleChatMessage", null);
__decorate([
    websockets_1.SubscribeMessage('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateWay.prototype, "handleLeaveChat", null);
__decorate([
    websockets_1.SubscribeMessage('joinLounge'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateWay.prototype, "handleJoinLounge", null);
__decorate([
    websockets_1.SubscribeMessage('leaveLounge'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateWay.prototype, "handleLeaveLounge", null);
ChatGateWay = __decorate([
    websockets_1.WebSocketGateway({
        cors: true,
        serveClient: true,
    }),
    common_1.Injectable()
], ChatGateWay);
exports.ChatGateWay = ChatGateWay;
//# sourceMappingURL=chat.gateway.js.map