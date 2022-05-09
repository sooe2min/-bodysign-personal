import { ExercisesModule } from 'src/exercises/exercises.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseCategory } from './entities/exercise-category.entity';
import { ExerciseCategoriesResolver } from './exercise-categories.resolver';
import { ExerciseCategoriesService } from './exercise-categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseCategory]),
    forwardRef(() => ExercisesModule),
  ],
  providers: [ExerciseCategoriesResolver, ExerciseCategoriesService],
  exports: [ExerciseCategoriesService],
})
export class ExerciseCategoriesModule {}
