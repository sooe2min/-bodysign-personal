import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateExerciseCategoryInput {
  /**
   *
   * Required Fields
   *
   */

  @Field((type) => Int, { nullable: false })
  trainerId: number;

  @Field({ nullable: false })
  name: string;

  /**
   *
   * Non Required Fields
   *
   */
}
