import GeneralStatusTypes from 'src/types/generalStatus.types';

import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateInbodyInput } from './create-inbody.input';

@InputType()
export class UpdateInbodyInput extends PartialType(CreateInbodyInput) {
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

  @Field((type) => Float, { nullable: true })
  bodyWeight?: number;

  @Field((type) => Float, { nullable: true })
  muscleWeight?: number;

  @Field((type) => Float, { nullable: true })
  bodyFat?: number;

  @Field({ nullable: true })
  measuredDate?: Date;

  @Field({ nullable: true })
  status?: GeneralStatusTypes;
}
