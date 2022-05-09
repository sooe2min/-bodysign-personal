import { Session } from '../../sessions/entities/session.entity';
import { SessionExerciseVolume } from '../../session-exercise-volumes/entities/session-exercise-volume.entity';
export declare class SessionExercise {
    id: number;
    name: string;
    sessionId: number;
    createdAt: Date;
    updatedAt: Date;
    exerciseCategoryName: string;
    session: Session;
    sessionExerciseVolumes?: SessionExerciseVolume[];
}
