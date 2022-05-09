import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TrainersService } from './trainers.service';
import { Trainer } from './entities/trainer.entity';
import { CreateTrainerInput } from './dto/create-trainer.input';
import { UpdateTrainerInput } from './dto/update-trainer.input';
import { UpdatePasswordTrainerInput } from './dto/updatePassword-trainer.input';
import { User } from 'src/users/entities/user.entity';
import { CreateSocialTrainerInput } from './dto/create-socialTrainer.input';
import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CurrentUser } from 'src/auth/dto/currentUser.param';

@Resolver(() => Trainer)
export class TrainersResolver {
  constructor(private readonly trainersService: TrainersService) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [Trainer], { name: 'trainers' })
  findAll() {
    return this.trainersService.findAll();
  }

  @Query(() => Trainer, { name: 'trainer' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.trainersService.findOneById(id);
  }

  @Query(() => User)
  async findOneUserByPhoneNumber(
    @Args('phoneNumber', { type: () => String }) phoneNumber: string,
  ): Promise<User> {
    const user = await this.trainersService.findOneUserByPhoneNumber(
      phoneNumber,
    );
    if (!(user instanceof User)) {
      throw new NotFoundException();
    }

    return user;
  }

  /**
   *
   * Mutations
   *
   *
   */

  @Mutation(() => Trainer)
  createTrainer(
    @Args('createTrainerInput') createTrainerInput: CreateTrainerInput,
  ): Promise<Omit<Trainer, 'password' | 'dbPasswordSalt'>> {
    return this.trainersService.create(createTrainerInput);
  }

  @Mutation(() => Trainer)
  createSocialTrainer(
    @Args('createSocialTrainerInput')
    createSocialTrainerInput: CreateSocialTrainerInput,
  ) {
    return this.trainersService.createSocialTrainer(createSocialTrainerInput);
  }

  @Mutation(() => Trainer)
  @UseGuards(JwtAuthGuard)
  updateTrainer(
    @Args('updateTrainerInput') updateTrainerInput: UpdateTrainerInput,
    @CurrentUser() currentUser: User | Trainer,
  ) {
    const canMutate = this.trainersService.canMutate(
      currentUser,
      updateTrainerInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }
    return this.trainersService.update(updateTrainerInput);
  }

  @Mutation(() => Trainer)
  removeTrainer(@Args('id', { type: () => Int }) id: number) {
    return this.trainersService.remove(id);
  }

  @Mutation(() => Trainer)
  @UseGuards(JwtAuthGuard)
  updatePasswordTrainer(
    @Args('updatePasswordTrainerInput')
    updatePasswordTrainerInput: UpdatePasswordTrainerInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<Omit<Trainer, 'password' | 'dbPasswordSalt'>> {
    const canMutate = this.trainersService.canMutate(
      currentUser,
      updatePasswordTrainerInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }
    return this.trainersService.updatePasswordTrainer(
      updatePasswordTrainerInput,
    );
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField()
  users(@Parent() trainer: Trainer) {
    const { id } = trainer;
    return this.trainersService.findAllUsers(id);
  }

  @ResolveField()
  sessions(@Parent() trainer: Trainer) {
    const { id } = trainer;
    return this.trainersService.findAllSessionsByTrainerId(id);
  }

  @ResolveField()
  exerciseCategories(@Parent() trainer: Trainer) {
    const { id } = trainer;
    return this.trainersService.findAllExerciseCategoriesByTrainerId(id);
  }

  @ResolveField()
  nonRegisteredUsers(@Parent() trainer: Trainer) {
    const { id } = trainer;
    return this.trainersService.findAllNonRegisteredUsersByTrainerId(id);
  }

  @ResolveField()
  userCategories(@Parent() trainer: Trainer) {
    const { id } = trainer;
    return this.trainersService.findAllUserCategoriesByTrainerId(id);
  }

  @ResolveField()
  sessionHistories(@Parent() trainer: Trainer) {
    const { id } = trainer;
    return this.trainersService.findAllSessionHistoriesByTrainerId(id);
  }

  @ResolveField()
  trainerInterests(@Parent() trainer: Trainer) {
    const { id } = trainer;
    return this.trainersService.findAllTrainerInterestsByTrainerId(id);
  }
}
