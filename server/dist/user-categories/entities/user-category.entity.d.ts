import { NonRegisteredUser } from 'src/non-registered-users/entities/non-registered-user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import GeneralStatusTypes from 'src/types/generalStatus.types';
import { User } from 'src/users/entities/user.entity';
export declare class UserCategory {
    id: number;
    status: GeneralStatusTypes;
    name: string;
    trainerId: number;
    createdAt: Date;
    updatedAt: Date;
    trainer: Trainer;
    users?: User[];
    nonRegisteredUsers?: NonRegisteredUser[];
}
