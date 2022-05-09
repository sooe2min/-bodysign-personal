import { CreateExerciseInput } from './create-exercise.input';
declare const UpdateExerciseInput_base: import("@nestjs/common").Type<Partial<CreateExerciseInput>>;
export declare class UpdateExerciseInput extends UpdateExerciseInput_base {
    id: number;
    name?: string;
}
export {};
