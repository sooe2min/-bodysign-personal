import UserType from 'src/types/user.types';
import { CreateRefreshTokenInput } from './dto/create-user-refreshToken.input';
import { RefreshToken } from './entities/refreshToken.entity';
import { RefreshTokenService } from './refresh-tokens.service';
export declare class RefreshTokensResolver {
    private readonly refreshTokensService;
    constructor(refreshTokensService: RefreshTokenService);
    findOneById(targetId: number, targetType: UserType): Promise<RefreshToken>;
    createRefreshToken(createRefreshTokenInput: CreateRefreshTokenInput): Promise<RefreshToken>;
}
