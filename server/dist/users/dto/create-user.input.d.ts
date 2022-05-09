import GenderTypes from 'src/types/gender.types';
import LoginTypes from 'src/types/login.types';
export declare class CreateUserInput {
    email: string;
    userName: string;
    password: string;
    birthDate: Date;
    phoneNumber: string;
    gender: GenderTypes;
    loginType: LoginTypes;
}
