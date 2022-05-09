import { ExerciseCategoriesModule } from 'src/exercise-categories/exercise-categories.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exercise } from './entities/exercise.entity';
import { ExercisesResolver } from './exercises.resolver';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise]),
    forwardRef(() => ExerciseCategoriesModule),
  ],
  providers: [ExercisesResolver, ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
