import { IsNotEmpty, IsOptional } from 'class-validator';
import GeneralStatusTypes from 'src/types/generalStatus.types';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserCategoryInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  trainerId: number;

  @IsNotEmpty()
  @Field({ nullable: false })
  name: string;

  /**
   *
   * Non Required Fields
   *
   */

  @IsOptional()
  @Field({ nullable: true })
  status?: GeneralStatusTypes;
}
