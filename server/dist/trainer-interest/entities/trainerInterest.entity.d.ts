import GeneralStatusTypes from 'src/types/generalStatus.types';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class TrainerInterest {
    id: number;
    interest: string;
    trainerId: number;
    status: GeneralStatusTypes;
    createdAt: Date;
    updatedAt: Date;
    trainer: Trainer;
}
