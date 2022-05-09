import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

import GenderTypes from 'src/types/gender.types';
import LoginTypes from 'src/types/login.types';

@InputType()
export class CreateSocialUserInput {
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
  birthDate: Date;

  @IsNotEmpty()
  @Field({ nullable: false })
  phoneNumber: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  gender: GenderTypes;

  @IsNotEmpty()
  @Field({ nullable: false })
  loginType: LoginTypes;
}
