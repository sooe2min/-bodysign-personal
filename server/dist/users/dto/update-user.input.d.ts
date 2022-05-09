import GenderTypes from 'src/types/gender.types';
import GeneralStatusTypes from 'src/types/generalStatus.types';
export declare class UpdateUserInput {
    id: number;
    trainerId: number;
    graduate: boolean;
    status: GeneralStatusTypes;
    userCategoryId: number;
    birthDate: Date;
    phoneNumber: string;
    gender: GenderTypes;
}
