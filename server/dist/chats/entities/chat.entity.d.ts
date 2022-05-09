import ChatSenderTypes from 'src/types/chatSender.types';
import GeneralStatusTypes from '../../types/generalStatus.types';
import { Img } from '../../imgs/entities/img.entity';
import { Trainer } from '../../trainers/entities/trainer.entity';
import { User } from '../../users/entities/user.entity';
export declare class Chat {
    id: number;
    text: string;
    userId: number;
    user: User;
    trainerId: number;
    status: GeneralStatusTypes;
    createdAt: Date;
    updatedAt: Date;
    sender: ChatSenderTypes;
    seen: boolean;
    trainer: Trainer;
    imgs?: Img[];
}
