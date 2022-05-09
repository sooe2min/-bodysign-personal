import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateExerciseInput } from './create-exercise.input';

@InputType()
export class UpdateExerciseInput extends PartialType(CreateExerciseInput) {
  /**
   *
   * Required Fields
   *
   */

  @Field((type) => Int, { nullable: false })
  id: number;

  /**
   *
   * Non Required Fields
   *
   */

  @Field({ nullable: true })
  name?: string;
}
