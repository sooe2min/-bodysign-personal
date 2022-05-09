import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ExerciseCategoriesService } from './exercise-categories.service';
import { ExerciseCategory } from './entities/exercise-category.entity';
import { CreateExerciseCategoryInput } from './dto/create-exercise-category.input';
import { UpdateExerciseCategoryInput } from './dto/update-exercise-category.input';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { ExercisesService } from 'src/exercises/exercises.service';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => ExerciseCategory)
@UseGuards(JwtAuthGuard)
export class ExerciseCategoriesResolver {
  constructor(
    private readonly exerciseCategoriesService: ExerciseCategoriesService,
    private readonly exercisesService: ExercisesService,
  ) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [ExerciseCategory], { name: 'exerciseCategories' })
  findAll(): Promise<ExerciseCategory[]> {
    return this.exerciseCategoriesService.findAll();
  }

  @Query(() => ExerciseCategory, { name: 'exerciseCategory' })
  findOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ExerciseCategory> {
    return this.exerciseCategoriesService.findOneById(id);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => ExerciseCategory)
  createExerciseCategory(
    @Args('createExerciseCategoryInput')
    createExerciseCategoryInput: CreateExerciseCategoryInput,
  ): Promise<ExerciseCategory> {
    return this.exerciseCategoriesService.create(createExerciseCategoryInput);
  }

  @Mutation(() => ExerciseCategory)
  async updateExerciseCategory(
    @Args('updateExerciseCategoryInput')
    updateExerciseCategoryInput: UpdateExerciseCategoryInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<ExerciseCategory> {
    const canMutate = await this.exerciseCategoriesService.canMutate(
      currentUser,
      updateExerciseCategoryInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.exerciseCategoriesService.update(updateExerciseCategoryInput);
  }

  @Mutation((returns) => Boolean)
  async removeExerciseCategory(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<boolean> {
    const canMutate = await this.exerciseCategoriesService.canMutate(
      currentUser,
      id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.exerciseCategoriesService.remove(id);
  }

  @Mutation((returns) => Boolean)
  async bulkRemoveExerciseCategory(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<boolean> {
    const bulkCanMutate = await this.exerciseCategoriesService.bulkCanMutate(
      currentUser,
      ids,
    );

    if (!bulkCanMutate) {
      throw new ForbiddenException();
    }

    return await this.exerciseCategoriesService.bulkRemove(ids);
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField()
  exercises(@Parent() exerciseCategory: ExerciseCategory): Promise<Exercise[]> {
    const { id } = exerciseCategory;
    return this.exercisesService.findAllByExerciseCategoryId(id);
  }
}
