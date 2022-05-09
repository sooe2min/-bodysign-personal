import { AuthModule } from 'src/auth/auth.module';
import { InbodiesModule } from 'src/inbodies/inbodies.module';
import { SessionHistoriesModule } from 'src/session-histories/session-histories.module';
import { SessionsModule } from 'src/sessions/sessions.module';
import { TrainersModule } from 'src/trainers/trainers.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => TrainersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => SessionsModule),
    forwardRef(() => InbodiesModule),
    forwardRef(() => SessionHistoriesModule),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
