import { ForbiddenException, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { Chat } from 'src/chats/entities/chat.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateImgInput } from './dto/create-img.input';
import { FindImgsInput } from './dto/find-imgs.input';
import { Img } from './entities/img.entity';
import { ImgsService } from './imgs.service';

@Resolver((of) => Img)
export class ImgsResolver {
  constructor(private imgsService: ImgsService) {}

  @Query((returns) => [Img])
  findImgsByUserIdAndTrainerId(
    @Args('findImgsInput') findImgsInput: FindImgsInput,
  ): Promise<Img[]> {
    return this.imgsService.findByUserIdAndTrainerId(findImgsInput);
  }

  @Query((returns) => Img)
  getImg(@Args('id', { type: () => Int }) id: number): Promise<Img> {
    return this.imgsService.findOneById(id);
  }

  @Mutation((returns) => Boolean)
  @UseGuards(JwtAuthGuard)
  async removeImg(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<boolean> {
    const canMutate = await this.imgsService.canMutate(currentUser, id);
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.imgsService.remove(id);
  }

  @Mutation((returns) => Boolean)
  @UseGuards(JwtAuthGuard)
  async bulkRemoveImg(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<boolean> {
    const bulkCanMutate = await this.imgsService.bulkCanMutate(
      currentUser,
      ids,
    );

    if (!bulkCanMutate) {
      throw new ForbiddenException();
    }

    return await this.imgsService.bulkRemove(ids);
  }

  @ResolveField((returns) => Chat)
  chat(@Parent() img: Img): Promise<Chat> {
    return this.imgsService.getChat(img.chatId);
  }

  @Mutation((returns) => Img)
  createImg(
    @Args('createImgInput') createImgInput: CreateImgInput,
  ): Promise<Img> {
    return this.imgsService.createImg(createImgInput);
  }
}
