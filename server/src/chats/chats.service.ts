import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImgsService } from 'src/imgs/imgs.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import ChatSenderTypes from 'src/types/chatSender.types';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChatInput } from './dto/create-chat.input';
import { FindChatsInput } from './dto/find-chats.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
    @Inject(forwardRef(() => ImgsService)) private imgsService: ImgsService,
  ) {}

  async create(createChatInput: CreateChatInput): Promise<Chat> {
    const { imgIds, ...newChatInput } = createChatInput;
    const newChat = this.chatsRepository.create(newChatInput);

    await this.chatsRepository.save(newChat);

    if (imgIds.length > 0) {
      await this.imgsService.bulkUpdateChatId(newChat.id, imgIds);
    }

    return this.chatsRepository.findOneOrFail(newChat.id, {
      relations: ['imgs'],
    });
  }

  findAll(): Promise<Chat[]> {
    return this.chatsRepository.find();
  }

  findOneById(id: number): Promise<Chat> {
    return this.chatsRepository.findOneOrFail(id);
  }

  findRecentChatByUserIdAndTrainerId(
    userId: number,
    trainerId: number,
  ): Promise<Chat[]> {
    return this.chatsRepository.find({
      where: {
        userId,
        trainerId,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['imgs'],
      take: 10,
    });
  }

  findChatsByUserIdAndTrainerId(
    findChatsInput: FindChatsInput,
  ): Promise<Chat[]> {
    const { userId, trainerId, page, per } = findChatsInput;
    return this.chatsRepository.find({
      where: {
        userId,
        trainerId,
      },
      relations: ['imgs'],
      take: per,
      skip: page * per,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(updateChatInput: UpdateChatInput): Promise<Chat> {
    const chat = await this.chatsRepository.findOneOrFail(updateChatInput.id);
    return this.chatsRepository.save({
      ...chat,
      ...updateChatInput,
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.chatsRepository.delete(id);
    const imgs = await this.imgsService.findAllByChatId(id);

    return result.affected == 1 && imgs.length == 0;
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    const chat = await this.findOneById(id);
    if (chat.sender === ChatSenderTypes.USER && currentUser instanceof User) {
      return chat.userId === currentUser.id;
    } else if (
      chat.sender === ChatSenderTypes.TRAINER &&
      currentUser instanceof Trainer
    ) {
      return chat.trainerId === currentUser.id;
    }

    return false;
  }
}
