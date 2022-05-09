import { Module, forwardRef } from '@nestjs/common';

import { TrainerInterest } from './entities/trainerInterest.entity';
import { TrainerInterestService } from './trainer-interest.service';
import { TrainersModule } from 'src/trainers/trainers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainerInterest]),
    forwardRef(() => TrainersModule),
  ],
  providers: [TrainerInterestService],
  exports: [TrainerInterestService],
})
export class TrainerInterestModule {}
