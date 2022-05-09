import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class ExerciseCategory {
    id: number;
    name: string;
    trainerId: number;
    createdAt: Date;
    updatedAt: Date;
    trainer: Trainer;
    exercises?: Exercise[];
}
