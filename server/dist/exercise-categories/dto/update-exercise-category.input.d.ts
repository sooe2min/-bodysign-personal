import { CreateExerciseCategoryInput } from './create-exercise-category.input';
declare const UpdateExerciseCategoryInput_base: import("@nestjs/common").Type<Partial<CreateExerciseCategoryInput>>;
export declare class UpdateExerciseCategoryInput extends UpdateExerciseCategoryInput_base {
    id: number;
    name?: string;
}
export {};
