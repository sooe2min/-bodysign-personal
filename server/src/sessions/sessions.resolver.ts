import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { Session } from './entities/session.entity';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { SessionExercisesService } from 'src/session-exercises/session-exercises.service';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => Session)
@UseGuards(JwtAuthGuard)
export class SessionsResolver {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly sessionExerciseService: SessionExercisesService,
  ) {}

  /**
   *
   * Query
   *
   */

  @Query(() => [Session], { name: 'sessions' })
  findAll(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }

  @Query(() => Session, { name: 'session' })
  findOneById(@Args('id', { type: () => Int }) id: number): Promise<Session> {
    return this.sessionsService.findOneById(id);
  }

  @Query(() => [Session])
  findAllSessionsByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Session[]> {
    return this.sessionsService.findAllByUserId(userId);
  }

  @Query(() => [Session])
  findAllSessionsByTrainerId(
    @Args('trainerId', { type: () => Int }) trainerId: number,
  ): Promise<Session[]> {
    return this.sessionsService.findAllByTrainerId(trainerId);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => Session)
  createSession(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
  ): Promise<Session> {
    return this.sessionsService.create(createSessionInput);
  }

  @Mutation(() => Session)
  async updateSession(
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<Session> {
    const canMutate = await this.sessionsService.canMutate(
      currentUser,
      updateSessionInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.sessionsService.update(updateSessionInput);
  }

  @Mutation(() => Session)
  async removeSession(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ) {
    const canMutate = await this.sessionsService.canMutate(currentUser, id);
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.sessionsService.remove(id);
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField()
  sessionExercises(@Parent() session: Session) {
    const { id } = session;
    return this.sessionExerciseService.findAllBySessionId(id);
  }

  @ResolveField()
  user(@Parent() session: Session) {
    const { userId } = session;
    return this.sessionsService.getUser(userId);
  }

  @ResolveField()
  trainer(@Parent() session: Session) {
    const { trainerId } = session;
    return this.sessionsService.getTrainer(trainerId);
  }
}
