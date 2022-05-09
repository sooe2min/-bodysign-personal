import { IsNotEmpty, IsOptional } from 'class-validator';
import GeneralStatusTypes from 'src/types/generalStatus.types';

import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateUserCategoryInput } from './create-user-category.input';

@InputType()
export class UpdateUserCategoryInput extends PartialType(
  CreateUserCategoryInput,
) {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  id: number;

  /**
   *
   * Non Required Fields
   *
   */

  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  status?: GeneralStatusTypes;
}
