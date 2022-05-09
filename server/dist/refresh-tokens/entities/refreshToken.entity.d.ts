import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import UserType from 'src/types/user.types';
export declare class RefreshToken {
    id: number;
    targetType: UserType;
    targetId: number;
    refreshToken: string;
    providerId: string;
    user?: User;
    trainer?: Trainer;
}
