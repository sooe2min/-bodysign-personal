import { SessionExerciseVolume } from 'src/session-exercise-volumes/entities/session-exercise-volume.entity';
import { SessionExerciseVolumesService } from 'src/session-exercise-volumes/session-exercise-volumes.service';
import { Session } from 'src/sessions/entities/session.entity';
import { SessionsService } from 'src/sessions/sessions.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSessionExerciseInput } from './dto/create-session-exercise.input';
import { SessionExercise } from './entities/session-exercise.entity';
export declare class SessionExercisesService {
    private sessionExercisesRepository;
    private sessionsService;
    private sessionExerciseVolumesService;
    constructor(sessionExercisesRepository: Repository<SessionExercise>, sessionsService: SessionsService, sessionExerciseVolumesService: SessionExerciseVolumesService);
    create(createSessionExerciseInput: CreateSessionExerciseInput): Promise<SessionExercise>;
    bulkCreate(sessionId: number, names: string[], exerciseCategoryNames: string[]): Promise<SessionExercise[]>;
    findAll(): Promise<SessionExercise[]>;
    findOneById(id: number): Promise<SessionExercise>;
    findAllBySessionId(sessionId: number): Promise<SessionExercise[]>;
    getSession(sessionId: number): Promise<Session>;
    getSessionExerciseVolumes(id: number): Promise<SessionExerciseVolume[]>;
    remove(id: number): Promise<boolean>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
}
