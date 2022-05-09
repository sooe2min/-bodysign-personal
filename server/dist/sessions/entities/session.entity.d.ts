import { SessionExercise } from '../../session-exercises/entities/session-exercise.entity';
import { Trainer } from '../../trainers/entities/trainer.entity';
import SessionStatusTypes from '../../types/sessionStatus.types';
import { User } from '../../users/entities/user.entity';
export declare class Session {
    id: number;
    userId: number;
    trainerId: number;
    status: SessionStatusTypes;
    feedback: string;
    sentFeedback: boolean;
    completedSession: boolean;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    trainer: Trainer;
    sessionExercises?: SessionExercise[];
}
