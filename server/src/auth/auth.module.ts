import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenModule } from 'src/refresh-tokens/refresh-tokens.module';
import Time from 'src/types/time.types';
import { TrainersModule } from 'src/trainers/trainers.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TrainersModule,
    PassportModule,
    RefreshTokenModule,
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: {
        expiresIn:
          process.env.NODE_ENV === 'prod'
            ? Time.SEC_IN_HOUR
            : Time.SEC_IN_MINUTE,
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    GoogleStrategy,
    KakaoStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
