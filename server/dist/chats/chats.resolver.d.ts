import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ImgsService } from '../imgs/imgs.service';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { FindChatsInput } from './dto/find-chats.input';
export declare class ChatsResolver {
    private readonly chatsService;
    private readonly imgsService;
    constructor(chatsService: ChatsService, imgsService: ImgsService);
    createChat(createChatInput: CreateChatInput): Promise<Chat>;
    findAll(): Promise<Chat[]>;
    findOneById(id: number): Promise<Chat>;
    findChatsByUserIdAndTrainerId(findChatsInput: FindChatsInput): Promise<Chat[]>;
    imgs(chat: Chat): Promise<import("../imgs/entities/img.entity").Img[]>;
    updateChat(updateChatInput: UpdateChatInput, currentUser: User | Trainer): Promise<Chat>;
    removeChat(id: number, currentUser: User | Trainer): Promise<boolean>;
}
