import { Module, forwardRef } from '@nestjs/common';

import { ExerciseCategoriesModule } from 'src/exercise-categories/exercise-categories.module';
import { NonRegisteredUsersModule } from 'src/non-registered-users/non-registered-users.module';
import { RefreshTokenModule } from 'src/refresh-tokens/refresh-tokens.module';
import { SessionHistoriesModule } from 'src/session-histories/session-histories.module';
import { SessionsModule } from 'src/sessions/sessions.module';
import { Trainer } from './entities/trainer.entity';
import { TrainerInterestModule } from 'src/trainer-interest/trainer-interest.module';
import { TrainersResolver } from './trainers.resolver';
import { TrainersService } from './trainers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCategoriesModule } from 'src/user-categories/user-categories.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainer]),
    forwardRef(() => UsersModule),
    forwardRef(() => SessionsModule),
    forwardRef(() => ExerciseCategoriesModule),
    forwardRef(() => NonRegisteredUsersModule),
    forwardRef(() => UserCategoriesModule),
    forwardRef(() => SessionHistoriesModule),
    forwardRef(() => TrainerInterestModule),
    forwardRef(() => RefreshTokenModule),
  ],
  providers: [TrainersResolver, TrainersService],
  exports: [TrainersService],
})
export class TrainersModule {}
