import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

import GenderTypes from 'src/types/gender.types';
import GeneralStatusTypes from 'src/types/generalStatus.types';

@InputType()
export class UpdateUserInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field(() => Int, { nullable: false })
  id: number;

  /**
   *
   * Non Required Fields
   *
   */

  @IsOptional()
  @Field(() => Int, { nullable: true })
  trainerId: number;

  @IsOptional()
  @Field({ nullable: true })
  graduate: boolean;

  @IsOptional()
  @Field({ nullable: true })
  status: GeneralStatusTypes;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  userCategoryId: number;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  birthDate: Date;

  @IsOptional()
  @Field({ nullable: true })
  phoneNumber: string;

  @IsOptional()
  @Field({ nullable: true })
  gender: GenderTypes;
}
