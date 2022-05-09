import { Module, forwardRef } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './entities/refreshToken.entity';
import { RefreshTokenService } from './refresh-tokens.service';
import { RefreshTokensResolver } from './refresh-token.resolver';
import Time from 'src/types/time.types';
import { TrainersModule } from 'src/trainers/trainers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([RefreshToken]),
    forwardRef(() => UsersModule),
    forwardRef(() => TrainersModule),
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: Time.SEC_IN_DAY * 30 },
    }),
  ],
  providers: [RefreshTokenService, RefreshTokensResolver],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
