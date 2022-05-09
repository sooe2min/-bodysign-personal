/// <reference types="multer-s3" />
import { ChatsService } from '../chats/chats.service';
import { Repository, UpdateResult } from 'typeorm';
import { CreateImgInput } from './dto/create-img.input';
import { Img } from './entities/img.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { Request } from 'express';
import { FindImgsInput } from './dto/find-imgs.input';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class ImgsService {
    private imgsRepository;
    private chatsService;
    constructor(imgsRepository: Repository<Img>, chatsService: ChatsService);
    createImg(createImgInput: CreateImgInput): Promise<Img>;
    findAll(): Promise<Img[]>;
    findOneById(id: number): Promise<Img>;
    findAllByChatId(chatId: number): Promise<Img[]>;
    findByUserIdAndTrainerId(findImgsInput: FindImgsInput): Promise<Img[]>;
    getChat(chatId: number): Promise<Chat>;
    uploadImg(file: Express.MulterS3.File, req: Request): Promise<{
        url: any;
    } & Img>;
    bulkUpdateChatId(chatId: number, ids: number[]): Promise<UpdateResult>;
    remove(id: number): Promise<boolean>;
    bulkRemove(ids: number[]): Promise<boolean>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
    bulkCanMutate(currentUser: User | Trainer, ids: number[]): Promise<boolean>;
}
