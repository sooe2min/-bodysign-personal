import GenderTypes from 'src/types/gender.types';
import GeneralStatusTypes from 'src/types/generalStatus.types';
export declare class CreateNonRegisteredUserInput {
    trainerId: number;
    userCategoryId: number;
    userName: string;
    phoneNumber?: string;
    gender?: GenderTypes;
    status?: GeneralStatusTypes;
    graduate?: boolean;
}
