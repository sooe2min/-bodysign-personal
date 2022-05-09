import { SessionExercise } from 'src/session-exercises/entities/session-exercise.entity';
import { SessionExercisesService } from 'src/session-exercises/session-exercises.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSessionExerciseVolumeInput } from './dto/create-session-exercise-volume.input';
import { UpdateSessionExerciseVolumeInput } from './dto/update-session-exercise-volume.input';
import { SessionExerciseVolume } from './entities/session-exercise-volume.entity';
export declare class SessionExerciseVolumesService {
    private sessionExerciseVolumesRepository;
    private sessionExercisesService;
    constructor(sessionExerciseVolumesRepository: Repository<SessionExerciseVolume>, sessionExercisesService: SessionExercisesService);
    create(createSessionExerciseVolumeInput: CreateSessionExerciseVolumeInput): Promise<SessionExerciseVolume>;
    findAll(): Promise<SessionExerciseVolume[]>;
    findOneById(id: number): Promise<SessionExerciseVolume>;
    findAllBySessionExerciseId(sessionExerciseId: number): Promise<SessionExerciseVolume[]>;
    getSessionExercise(sessionExerciseId: number): Promise<SessionExercise>;
    update(updateSessionExerciseVolumeInput: UpdateSessionExerciseVolumeInput): Promise<SessionExerciseVolume>;
    remove(id: number): Promise<boolean>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
}
