import GeneralStatusTypes from 'src/types/generalStatus.types';
export declare class CreateSessionHistoryInput {
    userId: number;
    date: Date;
    costPerSession: number;
    totalCount: number;
    status?: GeneralStatusTypes;
    commission?: number;
}
