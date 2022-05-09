import { IsNotEmpty, IsOptional } from 'class-validator';

import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateSessionExerciseVolumeInput } from './create-session-exercise-volume.input';

@InputType()
export class UpdateSessionExerciseVolumeInput extends PartialType(
  CreateSessionExerciseVolumeInput,
) {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  id: number;

  /**
   *
   * Non Required Fields
   *
   */
  @IsOptional()
  @Field((type) => Int, { nullable: true })
  reps?: number;

  @IsOptional()
  @Field((type) => Int, { nullable: true })
  sets?: number;

  @IsOptional()
  @Field((type) => Float, { nullable: true })
  weight?: number;

  @IsOptional()
  @Field((type) => Int, { nullable: true })
  seq: number;
}
