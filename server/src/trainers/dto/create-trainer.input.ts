import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

import GenderTypes from 'src/types/gender.types';
import LoginTypes from 'src/types/login.types';
import TrainerInterestTypes from 'src/types/trainerInterest.types';

@InputType()
export class CreateTrainerInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @IsEmail()
  @Field({ nullable: false })
  email: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  userName: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  password: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  gender: GenderTypes;

  @IsNotEmpty()
  @Field({ nullable: false })
  loginType: LoginTypes;

  @Field(() => [String], { nullable: true })
  interests: string[];
}
