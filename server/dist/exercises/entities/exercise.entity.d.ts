import { ExerciseCategory } from 'src/exercise-categories/entities/exercise-category.entity';
export declare class Exercise {
    id: number;
    name: string;
    exerciseCategoryId: number;
    createdAt: Date;
    updatedAt: Date;
    exerciseCategory: ExerciseCategory;
}
