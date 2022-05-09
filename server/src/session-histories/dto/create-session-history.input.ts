import GeneralStatusTypes from 'src/types/generalStatus.types';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSessionHistoryInput {
  /**
   *
   * Required Fields
   *
   */

  @Field((type) => Int, { nullable: false })
  userId: number;

  @Field({ nullable: false })
  date: Date;

  @Field((type) => Int, { nullable: false })
  costPerSession: number;

  @Field((type) => Int, { nullable: false })
  totalCount: number;

  /**
   *
   * Non Required Fields
   *
   */

  @Field({ nullable: true })
  status?: GeneralStatusTypes;

  @Field((type) => Int, { nullable: true })
  commission?: number;
}
