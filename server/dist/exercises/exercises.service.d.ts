import { ExerciseCategory } from 'src/exercise-categories/entities/exercise-category.entity';
import { ExerciseCategoriesService } from 'src/exercise-categories/exercise-categories.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { Exercise } from './entities/exercise.entity';
export declare class ExercisesService {
    private exercisesRepository;
    private exerciseCategoriesService;
    constructor(exercisesRepository: Repository<Exercise>, exerciseCategoriesService: ExerciseCategoriesService);
    create(createExerciseInput: CreateExerciseInput): Promise<Exercise>;
    bulkCreateDefault(exerciseCategoryId: number, names: string[]): Promise<Exercise[]>;
    findAll(): Promise<Exercise[]>;
    findOneById(id: number): Promise<Exercise>;
    findAllByExerciseCategoryId(exerciseCategoryId: number): Promise<Exercise[]>;
    getExerciseCategory(exerciseCategoryId: number): Promise<ExerciseCategory>;
    update(updateExerciseInput: UpdateExerciseInput): Promise<Exercise>;
    remove(id: number): Promise<Exercise>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
}
