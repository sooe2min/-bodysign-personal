import { ExercisesService } from 'src/exercises/exercises.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateExerciseCategoryInput } from './dto/create-exercise-category.input';
import { UpdateExerciseCategoryInput } from './dto/update-exercise-category.input';
import { ExerciseCategory } from './entities/exercise-category.entity';
export declare class ExerciseCategoriesService {
    private exerciseCategoriesRepository;
    private exercisesService;
    constructor(exerciseCategoriesRepository: Repository<ExerciseCategory>, exercisesService: ExercisesService);
    create(createExerciseCategoryInput: CreateExerciseCategoryInput): Promise<ExerciseCategory>;
    findAll(): Promise<ExerciseCategory[]>;
    findOneById(id: number): Promise<ExerciseCategory>;
    findAllByTrainerId(trainerId: number): Promise<ExerciseCategory[]>;
    update(updateExerciseCategoryInput: UpdateExerciseCategoryInput): Promise<ExerciseCategory>;
    remove(id: number): Promise<boolean>;
    bulkRemove(ids: number[]): Promise<boolean>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
    bulkCanMutate(currentUser: User | Trainer, ids: number[]): Promise<boolean>;
    createDefault(trainerId: number): Promise<boolean>;
}
