import { SessionsService } from './sessions.service';
import { Session } from './entities/session.entity';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { SessionExercisesService } from 'src/session-exercises/session-exercises.service';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class SessionsResolver {
    private readonly sessionsService;
    private readonly sessionExerciseService;
    constructor(sessionsService: SessionsService, sessionExerciseService: SessionExercisesService);
    findAll(): Promise<Session[]>;
    findOneById(id: number): Promise<Session>;
    findAllSessionsByUserId(userId: number): Promise<Session[]>;
    findAllSessionsByTrainerId(trainerId: number): Promise<Session[]>;
    createSession(createSessionInput: CreateSessionInput): Promise<Session>;
    updateSession(updateSessionInput: UpdateSessionInput, currentUser: User | Trainer): Promise<Session>;
    removeSession(id: number, currentUser: User | Trainer): Promise<Session>;
    sessionExercises(session: Session): Promise<import("../session-exercises/entities/session-exercise.entity").SessionExercise[]>;
    user(session: Session): Promise<User>;
    trainer(session: Session): Promise<Trainer>;
}
