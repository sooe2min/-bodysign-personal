import GeneralStatusTypes from 'src/types/generalStatus.types';
import { CreateInbodyInput } from './create-inbody.input';
declare const UpdateInbodyInput_base: import("@nestjs/common").Type<Partial<CreateInbodyInput>>;
export declare class UpdateInbodyInput extends UpdateInbodyInput_base {
    id: number;
    bodyWeight?: number;
    muscleWeight?: number;
    bodyFat?: number;
    measuredDate?: Date;
    status?: GeneralStatusTypes;
}
export {};
