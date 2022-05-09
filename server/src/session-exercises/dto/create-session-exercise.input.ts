import { Field, InputType, Int } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSessionExerciseInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field({ nullable: false })
  name: string;

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  sessionId: number;

  @IsNotEmpty()
  @Field({ nullable: false })
  exerciseCategoryName: string;

  /**
   *
   * Non Required Fields
   *
   */
}
