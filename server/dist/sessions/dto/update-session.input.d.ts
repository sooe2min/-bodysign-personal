import SessionStatusTypes from 'src/types/sessionStatus.types';
import { CreateSessionInput } from './create-session.input';
declare const UpdateSessionInput_base: import("@nestjs/common").Type<Partial<CreateSessionInput>>;
export declare class UpdateSessionInput extends UpdateSessionInput_base {
    id: number;
    status?: SessionStatusTypes;
    feedback?: string;
    sentFeedback?: boolean;
    completedSession?: boolean;
    date?: Date;
}
export {};
