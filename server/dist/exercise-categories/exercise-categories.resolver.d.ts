import { ExerciseCategoriesService } from './exercise-categories.service';
import { ExerciseCategory } from './entities/exercise-category.entity';
import { CreateExerciseCategoryInput } from './dto/create-exercise-category.input';
import { UpdateExerciseCategoryInput } from './dto/update-exercise-category.input';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
export declare class ExerciseCategoriesResolver {
    private readonly exerciseCategoriesService;
    private readonly exercisesService;
    constructor(exerciseCategoriesService: ExerciseCategoriesService, exercisesService: ExercisesService);
    findAll(): Promise<ExerciseCategory[]>;
    findOneById(id: number): Promise<ExerciseCategory>;
    createExerciseCategory(createExerciseCategoryInput: CreateExerciseCategoryInput): Promise<ExerciseCategory>;
    updateExerciseCategory(updateExerciseCategoryInput: UpdateExerciseCategoryInput, currentUser: User | Trainer): Promise<ExerciseCategory>;
    removeExerciseCategory(id: number, currentUser: User | Trainer): Promise<boolean>;
    bulkRemoveExerciseCategory(ids: number[], currentUser: User | Trainer): Promise<boolean>;
    exercises(exerciseCategory: ExerciseCategory): Promise<Exercise[]>;
}
