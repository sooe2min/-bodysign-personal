import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SessionExercisesService } from './session-exercises.service';
import { SessionExercise } from './entities/session-exercise.entity';
import { CreateSessionExerciseInput } from './dto/create-session-exercise.input';
import { Session } from 'src/sessions/entities/session.entity';
import { SessionExerciseVolume } from 'src/session-exercise-volumes/entities/session-exercise-volume.entity';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => SessionExercise)
@UseGuards(JwtAuthGuard)
export class SessionExercisesResolver {
  constructor(
    private readonly sessionExercisesService: SessionExercisesService,
  ) {}

  /**
   *
   * Query
   *
   */

  @Query(() => [SessionExercise], { name: 'sessionExercises' })
  findAll() {
    return this.sessionExercisesService.findAll();
  }

  @Query(() => SessionExercise, { name: 'sessionExercise' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.sessionExercisesService.findOneById(id);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => SessionExercise)
  createSessionExercise(
    @Args('createSessionExerciseInput')
    createSessionExerciseInput: CreateSessionExerciseInput,
  ) {
    return this.sessionExercisesService.create(createSessionExerciseInput);
  }

  @Mutation(() => [SessionExercise])
  bulkCreateSessionExercises(
    @Args('sessionId', { type: () => Int }) sessionId: number,
    @Args('names', { type: () => [String] }) names: string[],
    @Args('exerciseCategoryNames', { type: () => [String] })
    exerciseCategoryNames: string[],
  ): Promise<SessionExercise[]> {
    return this.sessionExercisesService.bulkCreate(
      sessionId,
      names,
      exerciseCategoryNames,
    );
  }

  @Mutation(() => Boolean)
  async removeSessionExercise(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<boolean> {
    const canMutate = await this.sessionExercisesService.canMutate(
      currentUser,
      id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return await this.sessionExercisesService.remove(id);
  }

  /**
   *
   * Resolve Field
   *
   */

  @ResolveField((returns) => Session)
  session(@Parent() sessionExercise: SessionExercise): Promise<Session> {
    return this.sessionExercisesService.getSession(sessionExercise.sessionId);
  }

  @ResolveField((returns) => [SessionExerciseVolume])
  sessionExerciseVolumes(
    @Parent() sessionExercise: SessionExercise,
  ): Promise<SessionExerciseVolume[]> {
    const { id } = sessionExercise;
    return this.sessionExercisesService.getSessionExerciseVolumes(id);
  }
}
