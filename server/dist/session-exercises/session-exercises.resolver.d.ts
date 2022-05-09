import { SessionExercisesService } from './session-exercises.service';
import { SessionExercise } from './entities/session-exercise.entity';
import { CreateSessionExerciseInput } from './dto/create-session-exercise.input';
import { Session } from 'src/sessions/entities/session.entity';
import { SessionExerciseVolume } from 'src/session-exercise-volumes/entities/session-exercise-volume.entity';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class SessionExercisesResolver {
    private readonly sessionExercisesService;
    constructor(sessionExercisesService: SessionExercisesService);
    findAll(): Promise<SessionExercise[]>;
    findOneById(id: number): Promise<SessionExercise>;
    createSessionExercise(createSessionExerciseInput: CreateSessionExerciseInput): Promise<SessionExercise>;
    bulkCreateSessionExercises(sessionId: number, names: string[], exerciseCategoryNames: string[]): Promise<SessionExercise[]>;
    removeSessionExercise(id: number, currentUser: User | Trainer): Promise<boolean>;
    session(sessionExercise: SessionExercise): Promise<Session>;
    sessionExerciseVolumes(sessionExercise: SessionExercise): Promise<SessionExerciseVolume[]>;
}
