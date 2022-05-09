import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainersService } from 'src/trainers/trainers.service';
import LoginTypes from 'src/types/login.types';
import UserType from 'src/types/user.types';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateRefreshTokenInput } from './dto/create-user-refreshToken.input';
import { RefreshToken } from './entities/refreshToken.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokensRepository: Repository<RefreshToken>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => TrainersService))
    private trainersService: TrainersService,
    private jwtService: JwtService,
  ) {}

  async createRefreshToken(
    createRefreshTokenInput: CreateRefreshTokenInput,
  ): Promise<RefreshToken> {
    let owner;
    const { targetId, targetType, refreshToken, providerId } =
      createRefreshTokenInput;

    if (targetType === UserType.USER) {
      owner = await this.usersService.findOneById(targetId);
    } else {
      owner = await this.trainersService.findOneById(targetId);
    }

    const refreshTokenFromDB = await this.refreshTokensRepository.find({
      where: {
        targetType,
        targetId: owner.id,
      },
    });

    if (refreshTokenFromDB) {
      await this.refreshTokensRepository.remove(refreshTokenFromDB);
    }

    const createParams = { ...createRefreshTokenInput };

    // if local, manually create refresh token
    if (owner.loginType === LoginTypes.LOCAL) {
      createParams.refreshToken = this.jwtService.sign({
        email: owner.email,
        sub: owner.id,
        type: targetType,
      });
    }

    const newRefreshToken = this.refreshTokensRepository.create(createParams);
    return await this.refreshTokensRepository.save(newRefreshToken);
  }

  findOneByTargetTypeAndTargetId(
    targetType: UserType,
    targetId: number,
  ): Promise<RefreshToken> {
    return this.refreshTokensRepository.findOneOrFail({
      targetType,
      targetId,
    });
  }

  findOneByRefreshToken(refreshToken: string): Promise<RefreshToken> {
    return this.refreshTokensRepository.findOne({ refreshToken });
  }
}
