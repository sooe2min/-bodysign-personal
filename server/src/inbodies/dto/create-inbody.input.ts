import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateInbodyInput {
  /**
   *
   * Required Fields
   *
   */

  @Field((type) => Int, { nullable: false })
  userId: number;

  @Field((type) => Float, { nullable: false })
  bodyWeight: number;

  @Field((type) => Float, { nullable: false })
  muscleWeight: number;

  @Field((type) => Float, { nullable: false })
  bodyFat: number;

  @Field({ nullable: false })
  measuredDate: Date;

  /**
   *
   * Non Required Fields
   *
   */
}
