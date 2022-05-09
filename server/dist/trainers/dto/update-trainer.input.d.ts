import { CreateTrainerInput } from './create-trainer.input';
import GeneralStatusTypes from 'src/types/generalStatus.types';
declare const UpdateTrainerInput_base: import("@nestjs/common").Type<Partial<CreateTrainerInput>>;
export declare class UpdateTrainerInput extends UpdateTrainerInput_base {
    id: number;
    birthDate: Date;
    phoneNumber: string;
    status: GeneralStatusTypes;
    interests: string[];
}
export {};
