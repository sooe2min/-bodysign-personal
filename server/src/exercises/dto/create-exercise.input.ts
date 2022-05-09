import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateExerciseInput {
  /**
   *
   * Required Fields
   *
   */

  @Field((type) => Int, { nullable: false })
  exerciseCategoryId: number;

  @Field({ nullable: false })
  name: string;

  /**
   *
   * Non Required Fields
   *
   */
}
