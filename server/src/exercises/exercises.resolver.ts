import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ExercisesService } from './exercises.service';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { ExerciseCategory } from 'src/exercise-categories/entities/exercise-category.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => Exercise)
@UseGuards(JwtAuthGuard)
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [Exercise], { name: 'exercises' })
  findAll() {
    return this.exercisesService.findAll();
  }

  @Query(() => Exercise, { name: 'exercise' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.exercisesService.findOneById(id);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => Exercise)
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
  ): Promise<Exercise> {
    return this.exercisesService.create(createExerciseInput);
  }

  @Mutation(() => Exercise)
  async updateExercise(
    @Args('updateExerciseInput') updateExerciseInput: UpdateExerciseInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<Exercise> {
    const canMutate = await this.exercisesService.canMutate(
      currentUser,
      updateExerciseInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.exercisesService.update(updateExerciseInput);
  }

  @Mutation(() => Exercise)
  async removeExercise(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<Exercise> {
    const canMutate = await this.exercisesService.canMutate(currentUser, id);
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.exercisesService.remove(id);
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField((returns) => ExerciseCategory)
  exerciseCategory(@Parent() exercise: Exercise): Promise<ExerciseCategory> {
    const { exerciseCategoryId } = exercise;
    return this.exercisesService.getExerciseCategory(exerciseCategoryId);
  }
}
