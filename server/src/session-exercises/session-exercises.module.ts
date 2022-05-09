import { SessionExerciseVolumesModule } from 'src/session-exercise-volumes/session-exercise-volumes.module';
import { SessionsModule } from 'src/sessions/sessions.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionExercise } from './entities/session-exercise.entity';
import { SessionExercisesResolver } from './session-exercises.resolver';
import { SessionExercisesService } from './session-exercises.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionExercise]),
    forwardRef(() => SessionsModule),
    forwardRef(() => SessionExerciseVolumesModule),
  ],
  providers: [SessionExercisesResolver, SessionExercisesService],
  exports: [SessionExercisesService],
})
export class SessionExercisesModule {}
