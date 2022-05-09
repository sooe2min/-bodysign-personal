import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatsService } from './chats/chats.service'
import { TrainersService } from './trainers/trainers.service'
import ChatSenderTypes from './types/chatSender.types'
import { UserCategoriesService } from './user-categories/user-categories.service'
import { UsersService } from './users/users.service'

@WebSocketGateway(+process.env.WEB_SOCKET_PORT, {
	cors: true,
	serveClient: true
})
@Injectable()
export class ChatGateWay
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server

	private logger: Logger = new Logger()

	@Inject(forwardRef(() => UsersService))
	private usersService: UsersService

	@Inject(forwardRef(() => UsersService))
	private trainersService: TrainersService

	@Inject(forwardRef(() => ChatsService))
	private chatsService: ChatsService

	@Inject(forwardRef(() => UserCategoriesService))
	private userCategoriesService: UserCategoriesService

	// Setup

	afterInit(server: Server) {
		// init
	}

	handleDisconnect(client: Socket) {
		// disconnect
	}

	handleConnection(client: Socket, ...args: any[]) {
		// TODO: add trainer/user validation
		this.logger.log('Client connected...')
	}

	// Chat

	@SubscribeMessage('joinRoom')
	async handleJoinChat(client: Socket, room: string): Promise<void> {
		const [userId, trainerId] = room.split('|')

		if (isNaN(parseInt(userId)) || isNaN(parseInt(trainerId))) {
			client.disconnect(true)
			return
		}

		const chats =
			await this.chatsService.findRecentChatByUserIdAndTrainerId(
				parseInt(userId),
				parseInt(trainerId)
			)

		client.join(room)
		this.server.to(trainerId).emit('newMessageFromClient', userId)
		client.emit('joinedRoom', chats)
	}

	@SubscribeMessage('sendChat')
	async handleChatMessage(
		client: Socket,
		message: {
			sender: ChatSenderTypes
			room: string
			text: string
			imgIds: number[]
		}
	): Promise<void> {
		const [userId, trainerId] = message.room.split('|')

		if (isNaN(parseInt(userId)) || isNaN(parseInt(trainerId))) {
			client.disconnect(true)
			return
		}

		const { text, sender, imgIds } = message
		const chat = await this.chatsService.create({
			userId: parseInt(userId),
			trainerId: parseInt(trainerId),
			text,
			sender,
			imgIds
		})

		this.server.to(message.room).emit('receiveChat', chat)
	}

	@SubscribeMessage('leaveRoom')
	handleLeaveChat(client: Socket, room: string) {
		client.leave(room)
		client.emit('leftRoom')
		client.disconnect(true)
	}

	// Trainer lounge

	@SubscribeMessage('joinLounge')
	async handleJoinLounge(client: Socket, room: string) {
		if (isNaN(parseInt(room))) {
			client.disconnect(true)
			return
		}

		const loungeInfo = await this.userCategoriesService.getLoungeInfo(
			parseInt(room)
		)

		client.join(room)
		client.emit('joinedLounge', loungeInfo)
	}

	@SubscribeMessage('leaveLounge')
	async handleLeaveLounge(client: Socket, room: string) {
		client.leave(room)
		client.emit('leftLounge')
		client.disconnect(true)
	}
}
