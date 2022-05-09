import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ImgsService } from '../imgs/imgs.service';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { FindChatsInput } from './dto/find-chats.input';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => Chat)
@UseGuards(JwtAuthGuard)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly imgsService: ImgsService,
  ) {}

  @Mutation(() => Chat)
  createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatsService.create(createChatInput);
  }

  @Query(() => [Chat], { name: 'chats' })
  findAll() {
    return this.chatsService.findAll();
  }

  @Query(() => Chat, { name: 'chat' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.chatsService.findOneById(id);
  }

  @Query((returns) => [Chat])
  findChatsByUserIdAndTrainerId(
    @Args('findChatsInput') findChatsInput: FindChatsInput,
  ): Promise<Chat[]> {
    return this.chatsService.findChatsByUserIdAndTrainerId(findChatsInput);
  }

  @ResolveField()
  imgs(@Parent() chat: Chat) {
    const { id } = chat;
    return this.imgsService.findAllByChatId(id);
  }

  @Mutation((returns) => Chat)
  async updateChat(
    @Args('updateChatInput') updateChatInput: UpdateChatInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<Chat> {
    const canMutate = await this.chatsService.canMutate(
      currentUser,
      updateChatInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.chatsService.update(updateChatInput);
  }

  @Mutation((returns) => Boolean)
  async removeChat(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<boolean> {
    const canMutate = await this.chatsService.canMutate(currentUser, id);
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return await this.chatsService.remove(id);
  }
}
