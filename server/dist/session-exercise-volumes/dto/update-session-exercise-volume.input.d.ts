import { CreateSessionExerciseVolumeInput } from './create-session-exercise-volume.input';
declare const UpdateSessionExerciseVolumeInput_base: import("@nestjs/common").Type<Partial<CreateSessionExerciseVolumeInput>>;
export declare class UpdateSessionExerciseVolumeInput extends UpdateSessionExerciseVolumeInput_base {
    id: number;
    reps?: number;
    sets?: number;
    weight?: number;
    seq: number;
}
export {};
