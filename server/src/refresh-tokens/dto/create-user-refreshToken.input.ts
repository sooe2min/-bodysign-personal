import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

import UserType from 'src/types/user.types';

@InputType()
export class CreateRefreshTokenInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field((type) => Int)
  targetId: number;

  @IsNotEmpty()
  @Field()
  targetType: UserType;

  @IsOptional()
  @Field({ nullable: true })
  refreshToken?: string;

  @IsOptional()
  @Field({ nullable: true })
  providerId?: string;
}
