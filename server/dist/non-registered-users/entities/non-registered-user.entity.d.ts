import { Trainer } from 'src/trainers/entities/trainer.entity';
import GenderTypes from 'src/types/gender.types';
import GeneralStatusTypes from 'src/types/generalStatus.types';
import { UserCategory } from 'src/user-categories/entities/user-category.entity';
export declare class NonRegisteredUser {
    id: number;
    userName: string;
    phoneNumber: string;
    graduate: boolean;
    gender: GenderTypes;
    status: GeneralStatusTypes;
    trainerId: number;
    userCategoryId: number;
    createdAt: Date;
    updatedAt: Date;
    trainer: Trainer;
    userCategory: UserCategory;
}
