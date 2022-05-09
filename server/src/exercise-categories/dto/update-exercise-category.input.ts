import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateExerciseCategoryInput } from './create-exercise-category.input';

@InputType()
export class UpdateExerciseCategoryInput extends PartialType(
  CreateExerciseCategoryInput,
) {
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
