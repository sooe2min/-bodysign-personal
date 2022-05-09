import { IsNotEmpty } from 'class-validator';

import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSessionExerciseVolumeInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  sessionExerciseId: number;

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  reps: number;

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  sets: number;

  @IsNotEmpty()
  @Field((type) => Float, { nullable: false })
  weight: number;

  /**
   *
   * Non Required Fields
   *
   */
}
