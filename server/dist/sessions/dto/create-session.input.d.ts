import SessionStatusTypes from 'src/types/sessionStatus.types';
export declare class CreateSessionInput {
    userId: number;
    trainerId: number;
    status: SessionStatusTypes;
    feedback?: string;
    date?: Date;
}
