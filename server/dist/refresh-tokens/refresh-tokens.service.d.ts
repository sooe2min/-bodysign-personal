import { JwtService } from '@nestjs/jwt';
import { TrainersService } from 'src/trainers/trainers.service';
import UserType from 'src/types/user.types';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateRefreshTokenInput } from './dto/create-user-refreshToken.input';
import { RefreshToken } from './entities/refreshToken.entity';
export declare class RefreshTokenService {
    private refreshTokensRepository;
    private usersService;
    private trainersService;
    private jwtService;
    constructor(refreshTokensRepository: Repository<RefreshToken>, usersService: UsersService, trainersService: TrainersService, jwtService: JwtService);
    createRefreshToken(createRefreshTokenInput: CreateRefreshTokenInput): Promise<RefreshToken>;
    findOneByTargetTypeAndTargetId(targetType: UserType, targetId: number): Promise<RefreshToken>;
    findOneByRefreshToken(refreshToken: string): Promise<RefreshToken>;
}
