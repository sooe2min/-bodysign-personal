import { SessionExercise } from 'src/session-exercises/entities/session-exercise.entity';
export declare class SessionExerciseVolume {
    id: number;
    reps: number;
    sets: number;
    weight: number;
    seq: number;
    sessionExerciseId: number;
    createdAt: Date;
    updatedAt: Date;
    sessionExercise: SessionExercise;
}
