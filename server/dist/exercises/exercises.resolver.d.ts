import { ExercisesService } from './exercises.service';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { ExerciseCategory } from 'src/exercise-categories/entities/exercise-category.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
export declare class ExercisesResolver {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    findAll(): Promise<Exercise[]>;
    findOneById(id: number): Promise<Exercise>;
    createExercise(createExerciseInput: CreateExerciseInput): Promise<Exercise>;
    updateExercise(updateExerciseInput: UpdateExerciseInput, currentUser: User | Trainer): Promise<Exercise>;
    removeExercise(id: number, currentUser: User | Trainer): Promise<Exercise>;
    exerciseCategory(exercise: Exercise): Promise<ExerciseCategory>;
}
