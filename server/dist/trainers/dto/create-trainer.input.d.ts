import GenderTypes from 'src/types/gender.types';
import LoginTypes from 'src/types/login.types';
export declare class CreateTrainerInput {
    email: string;
    userName: string;
    password: string;
    gender: GenderTypes;
    loginType: LoginTypes;
    interests: string[];
}
