import { SessionExerciseVolumesService } from './session-exercise-volumes.service';
import { SessionExerciseVolume } from './entities/session-exercise-volume.entity';
import { CreateSessionExerciseVolumeInput } from './dto/create-session-exercise-volume.input';
import { UpdateSessionExerciseVolumeInput } from './dto/update-session-exercise-volume.input';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class SessionExerciseVolumesResolver {
    private readonly sessionExerciseVolumesService;
    constructor(sessionExerciseVolumesService: SessionExerciseVolumesService);
    findAll(): Promise<SessionExerciseVolume[]>;
    findOne(id: number): Promise<SessionExerciseVolume>;
    createSessionExerciseVolume(createSessionExerciseVolumeInput: CreateSessionExerciseVolumeInput): Promise<SessionExerciseVolume>;
    updateSessionExerciseVolume(updateSessionExerciseVolumeInput: UpdateSessionExerciseVolumeInput, currentUser: User | Trainer): Promise<SessionExerciseVolume>;
    removeSessionExerciseVolume(id: number, currentUser: User | Trainer): Promise<boolean>;
    sessionExercise(sessionExerciseVolume: SessionExerciseVolume): Promise<import("../session-exercises/entities/session-exercise.entity").SessionExercise>;
}
