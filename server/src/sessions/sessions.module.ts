import { SessionExercisesModule } from 'src/session-exercises/session-exercises.module';
import { SessionHistoriesModule } from 'src/session-histories/session-histories.module';
import { TrainersModule } from 'src/trainers/trainers.module';
import { UsersModule } from 'src/users/users.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Session } from './entities/session.entity';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    forwardRef(() => SessionExercisesModule),
    forwardRef(() => UsersModule),
    forwardRef(() => TrainersModule),
    forwardRef(() => SessionHistoriesModule),
  ],
  providers: [SessionsResolver, SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
