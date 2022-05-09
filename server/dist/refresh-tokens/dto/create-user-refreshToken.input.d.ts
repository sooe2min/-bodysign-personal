import UserType from 'src/types/user.types';
export declare class CreateRefreshTokenInput {
    targetId: number;
    targetType: UserType;
    refreshToken?: string;
    providerId?: string;
}
