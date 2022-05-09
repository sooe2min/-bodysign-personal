import GenderTypes from 'src/types/gender.types';
import LoginTypes from 'src/types/login.types';
export declare class CreateSocialUserInput {
    email: string;
    userName: string;
    birthDate: Date;
    phoneNumber: string;
    gender: GenderTypes;
    loginType: LoginTypes;
}
