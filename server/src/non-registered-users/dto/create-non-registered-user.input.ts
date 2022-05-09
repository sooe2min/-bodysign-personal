import GenderTypes from 'src/types/gender.types';
import GeneralStatusTypes from 'src/types/generalStatus.types';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateNonRegisteredUserInput {
  /**
   *
   * Required Fields
   *
   */

  @Field((type) => Int, { nullable: false })
  trainerId: number;

  @Field((type) => Int, { nullable: false })
  userCategoryId: number;

  @Field({ nullable: false })
  userName: string;

  /**
   *
   * Non Required Fields
   *
   */

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  gender?: GenderTypes;

  @Field({ nullable: true })
  status?: GeneralStatusTypes;

  @Field({ nullable: true })
  graduate?: boolean;
}
