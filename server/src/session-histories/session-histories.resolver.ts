import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SessionHistoriesService } from './session-histories.service';
import { SessionHistory } from './entities/session-history.entity';
import { CreateSessionHistoryInput } from './dto/create-session-history.input';
import { UpdateSessionHistoryInput } from './dto/update-session-history.input';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => SessionHistory)
@UseGuards(JwtAuthGuard)
export class SessionHistoriesResolver {
  constructor(
    private readonly sessionHistoriesService: SessionHistoriesService,
  ) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [SessionHistory], { name: 'sessionHistories' })
  findAll(): Promise<SessionHistory[]> {
    return this.sessionHistoriesService.findAll();
  }

  @Query(() => SessionHistory, { name: 'sessionHistory' })
  findOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<SessionHistory> {
    return this.sessionHistoriesService.findOneById(id);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => SessionHistory)
  createSessionHistory(
    @Args('createSessionHistoryInput')
    createSessionHistoryInput: CreateSessionHistoryInput,
  ): Promise<SessionHistory> {
    return this.sessionHistoriesService.create(createSessionHistoryInput);
  }

  @Mutation(() => SessionHistory)
  async updateSessionHistory(
    @Args('updateSessionHistoryInput')
    updateSessionHistoryInput: UpdateSessionHistoryInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<SessionHistory> {
    const canMutate = await this.sessionHistoriesService.canMutate(
      currentUser,
      updateSessionHistoryInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.sessionHistoriesService.update(updateSessionHistoryInput);
  }

  @Mutation(() => SessionHistory)
  async removeSessionHistory(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<SessionHistory> {
    const canMutate = await this.sessionHistoriesService.canMutate(
      currentUser,
      id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.sessionHistoriesService.remove(id);
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField((returns) => User)
  user(@Parent() sessionHistory: SessionHistory): Promise<User> {
    const { userId } = sessionHistory;
    return this.sessionHistoriesService.getUser(userId);
  }

  @ResolveField((returns) => Trainer)
  trainer(@Parent() sessionHistory: SessionHistory): Promise<Trainer> {
    const { trainerId } = sessionHistory;
    return this.sessionHistoriesService.getTrainer(trainerId);
  }
}
