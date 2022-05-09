import GeneralStatusTypes from 'src/types/generalStatus.types';
import { CreateSessionHistoryInput } from './create-session-history.input';
declare const UpdateSessionHistoryInput_base: import("@nestjs/common").Type<Partial<CreateSessionHistoryInput>>;
export declare class UpdateSessionHistoryInput extends UpdateSessionHistoryInput_base {
    id: number;
    date?: Date;
    costPerSession?: number;
    totalCount?: number;
    usedCount?: number;
    status?: GeneralStatusTypes;
    commission?: number;
}
export {};
