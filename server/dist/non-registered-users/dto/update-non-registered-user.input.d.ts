import GenderTypes from 'src/types/gender.types';
import GeneralStatusTypes from 'src/types/generalStatus.types';
import { CreateNonRegisteredUserInput } from './create-non-registered-user.input';
declare const UpdateNonRegisteredUserInput_base: import("@nestjs/common").Type<Partial<CreateNonRegisteredUserInput>>;
export declare class UpdateNonRegisteredUserInput extends UpdateNonRegisteredUserInput_base {
    id: number;
    userName?: string;
    phoneNumber?: string;
    gender?: GenderTypes;
    status?: GeneralStatusTypes;
}
export {};
