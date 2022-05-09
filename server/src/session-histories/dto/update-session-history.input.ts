import GeneralStatusTypes from 'src/types/generalStatus.types';

import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateSessionHistoryInput } from './create-session-history.input';

@InputType()
export class UpdateSessionHistoryInput extends PartialType(
  CreateSessionHistoryInput,
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
  @Field()
  date?: Date;

  @Field((type) => Int)
  costPerSession?: number;

  @Field((type) => Int)
  totalCount?: number;

  @Field((type) => Int)
  usedCount?: number;

  @Field()
  status?: GeneralStatusTypes;

  @Field((type) => Int)
  commission?: number;
}
