import { TrainersModule } from 'src/trainers/trainers.module';
import { UsersModule } from 'src/users/users.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionHistory } from './entities/session-history.entity';
import { SessionHistoriesResolver } from './session-histories.resolver';
import { SessionHistoriesService } from './session-histories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionHistory]),
    forwardRef(() => UsersModule),
    forwardRef(() => TrainersModule),
  ],
  providers: [SessionHistoriesResolver, SessionHistoriesService],
  exports: [SessionHistoriesService],
})
export class SessionHistoriesModule {}
