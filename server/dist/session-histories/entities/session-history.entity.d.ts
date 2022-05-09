import { Trainer } from 'src/trainers/entities/trainer.entity';
import GeneralStatusTypes from 'src/types/generalStatus.types';
import { User } from 'src/users/entities/user.entity';
export declare class SessionHistory {
    id: number;
    status: GeneralStatusTypes;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    costPerSession: number;
    totalCount: number;
    usedCount: number;
    commission: number;
    userId: number;
    trainerId: number;
    user: User;
    trainer: Trainer;
}
