import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/auth-login-user.input';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenService } from 'src/refresh-tokens/refresh-tokens.service';
import { Request, Response } from 'express';
export declare class AuthService {
    private usersService;
    private jwtService;
    private trainersService;
    private configService;
    private refreshTokensService;
    constructor(usersService: UsersService, jwtService: JwtService, trainersService: TrainersService, configService: ConfigService, refreshTokensService: RefreshTokenService);
    validateUser(payload: {
        type: string;
        sub: number;
        email: string;
    }): Promise<User | Trainer | null>;
    verifyOwner(payload: {
        type: string;
        sub: number;
        email: string;
    }): Promise<User | Trainer>;
    localLogin(loginUserInput: LoginUserInput): Promise<{
        accessToken: string;
        refreshToken: string;
        redirectUrl: any;
    }>;
    googleLogin(req: any, res: any): Promise<{
        redirectUrl: string;
        accessToken?: undefined;
        refreshToken?: undefined;
    } | {
        accessToken: string;
        refreshToken: string;
        redirectUrl: any;
    }>;
    renewToken(req: Request, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
