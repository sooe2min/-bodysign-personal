import { SessionExercisesModule } from 'src/session-exercises/session-exercises.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionExerciseVolume } from './entities/session-exercise-volume.entity';
import { SessionExerciseVolumesResolver } from './session-exercise-volumes.resolver';
import { SessionExerciseVolumesService } from './session-exercise-volumes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionExerciseVolume]),
    forwardRef(() => SessionExercisesModule),
  ],
  providers: [SessionExerciseVolumesResolver, SessionExerciseVolumesService],
  exports: [SessionExerciseVolumesService],
})
export class SessionExerciseVolumesModule {}
