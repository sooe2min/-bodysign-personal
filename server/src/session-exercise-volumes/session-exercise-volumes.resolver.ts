import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SessionExerciseVolumesService } from './session-exercise-volumes.service';
import { SessionExerciseVolume } from './entities/session-exercise-volume.entity';
import { CreateSessionExerciseVolumeInput } from './dto/create-session-exercise-volume.input';
import { UpdateSessionExerciseVolumeInput } from './dto/update-session-exercise-volume.input';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => SessionExerciseVolume)
@UseGuards(JwtAuthGuard)
export class SessionExerciseVolumesResolver {
  constructor(
    private readonly sessionExerciseVolumesService: SessionExerciseVolumesService,
  ) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [SessionExerciseVolume], { name: 'sessionExerciseVolumes' })
  findAll(): Promise<SessionExerciseVolume[]> {
    return this.sessionExerciseVolumesService.findAll();
  }

  @Query(() => SessionExerciseVolume, { name: 'sessionExerciseVolume' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<SessionExerciseVolume> {
    return this.sessionExerciseVolumesService.findOneById(id);
  }
  /**
   *
   * Mutations
   *
   */

  @Mutation(() => SessionExerciseVolume)
  createSessionExerciseVolume(
    @Args('createSessionExerciseVolumeInput')
    createSessionExerciseVolumeInput: CreateSessionExerciseVolumeInput,
  ): Promise<SessionExerciseVolume> {
    return this.sessionExerciseVolumesService.create(
      createSessionExerciseVolumeInput,
    );
  }

  @Mutation(() => SessionExerciseVolume)
  async updateSessionExerciseVolume(
    @Args('updateSessionExerciseVolumeInput')
    updateSessionExerciseVolumeInput: UpdateSessionExerciseVolumeInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<SessionExerciseVolume> {
    const canMutate = await this.sessionExerciseVolumesService.canMutate(
      currentUser,
      updateSessionExerciseVolumeInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.sessionExerciseVolumesService.update(
      updateSessionExerciseVolumeInput,
    );
  }

  @Mutation(() => Boolean)
  async removeSessionExerciseVolume(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<boolean> {
    const canMutate = await this.sessionExerciseVolumesService.canMutate(
      currentUser,
      id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.sessionExerciseVolumesService.remove(id);
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField()
  sessionExercise(@Parent() sessionExerciseVolume: SessionExerciseVolume) {
    const { sessionExerciseId } = sessionExerciseVolume;
    return this.sessionExerciseVolumesService.getSessionExercise(
      sessionExerciseId,
    );
  }
}
