import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseCategory } from 'src/exercise-categories/entities/exercise-category.entity';
import { ExerciseCategoriesService } from 'src/exercise-categories/exercise-categories.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    @Inject(forwardRef(() => ExerciseCategoriesService))
    private exerciseCategoriesService: ExerciseCategoriesService,
  ) {}

  create(createExerciseInput: CreateExerciseInput): Promise<Exercise> {
    const newExercise = this.exercisesRepository.create(createExerciseInput);
    return this.exercisesRepository.save(newExercise);
  }

  bulkCreateDefault(
    exerciseCategoryId: number,
    names: string[],
  ): Promise<Exercise[]> {
    const newExercises = names.map((name) =>
      this.exercisesRepository.create({ exerciseCategoryId, name }),
    );
    return this.exercisesRepository.save(newExercises);
  }

  findAll(): Promise<Exercise[]> {
    return this.exercisesRepository.find();
  }

  findOneById(id: number): Promise<Exercise> {
    return this.exercisesRepository.findOneOrFail(id);
  }

  findAllByExerciseCategoryId(exerciseCategoryId: number): Promise<Exercise[]> {
    return this.exercisesRepository.find({ exerciseCategoryId });
  }

  getExerciseCategory(exerciseCategoryId: number): Promise<ExerciseCategory> {
    return this.exerciseCategoriesService.findOneById(exerciseCategoryId);
  }

  async update(updateExerciseInput: UpdateExerciseInput): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOneOrFail(
      updateExerciseInput.id,
    );
    return this.exercisesRepository.save({
      ...exercise,
      ...updateExerciseInput,
    });
  }

  async remove(id: number): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOneOrFail(id);
    return this.exercisesRepository.remove(exercise);
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof User) return false;

    const exercise = await this.exercisesRepository.findOneOrFail({
      where: { id },
      relations: ['exerciseCategory'],
    });

    if (exercise.exerciseCategory.trainerId !== currentUser.id) {
      return false;
    }

    return true;
  }
}
