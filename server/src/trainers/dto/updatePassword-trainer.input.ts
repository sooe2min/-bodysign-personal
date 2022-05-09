import { IsNotEmpty } from 'class-validator';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordTrainerInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field(() => Int, { nullable: false })
  id: number;

  @IsNotEmpty()
  @Field({ nullable: false })
  prevPassword: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  nowPassword: string;
}
