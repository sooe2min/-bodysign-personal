import GeneralStatusTypes from 'src/types/generalStatus.types';
import { User } from 'src/users/entities/user.entity';
export declare class Inbody {
    id: number;
    bodyWeight: number;
    muscleWeight: number;
    bodyFat: number;
    status: GeneralStatusTypes;
    measuredDate: Date;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
