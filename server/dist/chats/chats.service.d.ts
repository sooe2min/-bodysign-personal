import { ImgsService } from 'src/imgs/imgs.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChatInput } from './dto/create-chat.input';
import { FindChatsInput } from './dto/find-chats.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';
export declare class ChatsService {
    private chatsRepository;
    private imgsService;
    constructor(chatsRepository: Repository<Chat>, imgsService: ImgsService);
    create(createChatInput: CreateChatInput): Promise<Chat>;
    findAll(): Promise<Chat[]>;
    findOneById(id: number): Promise<Chat>;
    findRecentChatByUserIdAndTrainerId(userId: number, trainerId: number): Promise<Chat[]>;
    findChatsByUserIdAndTrainerId(findChatsInput: FindChatsInput): Promise<Chat[]>;
    update(updateChatInput: UpdateChatInput): Promise<Chat>;
    remove(id: number): Promise<boolean>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
}
