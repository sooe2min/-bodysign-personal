import GenderTypes from 'src/types/gender.types';
import GeneralStatusTypes from 'src/types/generalStatus.types';

import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateNonRegisteredUserInput } from './create-non-registered-user.input';

@InputType()
export class UpdateNonRegisteredUserInput extends PartialType(
  CreateNonRegisteredUserInput,
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

  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  gender?: GenderTypes;

  @Field({ nullable: true })
  status?: GeneralStatusTypes;
}
