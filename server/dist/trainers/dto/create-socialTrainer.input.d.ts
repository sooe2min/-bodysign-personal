import GenderTypes from 'src/types/gender.types';
import LoginTypes from 'src/types/login.types';
export declare class CreateSocialTrainerInput {
    email: string;
    userName: string;
    gender: GenderTypes;
    loginType: LoginTypes;
    interests: string[];
}
