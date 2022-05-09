import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsService } from '../chats/chats.service';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateImgInput } from './dto/create-img.input';
import { Img } from './entities/img.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import * as AWS from 'aws-sdk';
import { Request } from 'express';
import { FindImgsInput } from './dto/find-imgs.input';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import ChatSenderTypes from 'src/types/chatSender.types';

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@Injectable()
export class ImgsService {
  constructor(
    @InjectRepository(Img) private imgsRepository: Repository<Img>,
    @Inject(forwardRef(() => ChatsService)) private chatsService: ChatsService,
  ) {}

  async createImg(createImgInput: CreateImgInput): Promise<Img> {
    const chat = await this.chatsService.findOneById(createImgInput.chatId);
    const createParams = {
      ...createImgInput,
      trainerId: chat.trainerId,
      userId: chat.userId,
    };
    const newImg = this.imgsRepository.create(createParams);

    return this.imgsRepository.save(newImg);
  }

  findAll(): Promise<Img[]> {
    return this.imgsRepository.find();
  }

  findOneById(id: number): Promise<Img> {
    return this.imgsRepository.findOneOrFail(id);
  }

  findAllByChatId(chatId: number): Promise<Img[]> {
    return this.imgsRepository.find({ chatId });
  }

  findByUserIdAndTrainerId(findImgsInput: FindImgsInput): Promise<Img[]> {
    const { userId, trainerId, page, per } = findImgsInput;
    return this.imgsRepository.find({
      where: { userId, trainerId },
      take: per,
      skip: page * per,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getChat(chatId: number): Promise<Chat> {
    return this.chatsService.findOneById(chatId);
  }

  async uploadImg(file: Express.MulterS3.File, req: Request) {
    try {
      return await this.imgsRepository.save({ url: req.files[0].location });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async bulkUpdateChatId(chatId: number, ids: number[]): Promise<UpdateResult> {
    const chat = await this.chatsService.findOneById(chatId);
    return this.imgsRepository.update(
      { id: In(ids) },
      { chatId, userId: chat.userId, trainerId: chat.trainerId },
    );
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.imgsRepository.delete(id);
    return result.affected === 1;
  }

  async bulkRemove(ids: number[]): Promise<boolean> {
    const result = await this.imgsRepository.delete(ids);
    return result.affected == ids.length;
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    const img = await this.imgsRepository.findOneOrFail({
      where: { id },
      relations: ['chat'],
    });

    if (
      (currentUser instanceof User &&
        img.chat.sender === ChatSenderTypes.USER &&
        currentUser.id === img.userId) ||
      (currentUser instanceof Trainer &&
        img.chat.sender === ChatSenderTypes.TRAINER &&
        currentUser.id === img.trainerId)
    ) {
      return true;
    }

    return false;
  }

  async bulkCanMutate(
    currentUser: User | Trainer,
    ids: number[],
  ): Promise<boolean> {
    const imgs = await this.imgsRepository.find({
      where: {
        id: In(ids),
      },
      relations: ['chat'],
    });

    if (imgs.length !== ids.length) {
      return false;
    }

    for (let img of imgs) {
      if (
        (currentUser instanceof User &&
          img.chat.sender === ChatSenderTypes.USER &&
          currentUser.id === img.userId) ||
        (currentUser instanceof Trainer &&
          img.chat.sender === ChatSenderTypes.TRAINER &&
          currentUser.id === img.trainerId)
      ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
}
