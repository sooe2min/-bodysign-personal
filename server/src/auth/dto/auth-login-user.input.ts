import { Field, InputType } from '@nestjs/graphql';

import UserType from 'src/types/user.types';

@InputType()
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
