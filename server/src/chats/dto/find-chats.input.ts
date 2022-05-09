import { IsInt, IsNotEmpty } from 'class-validator';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindChatsInput {
  @IsNotEmpty()
  @IsInt()
  @Field((type) => Int, { nullable: false })
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Field((type) => Int, { nullable: false })
  trainerId: number;

  @IsNotEmpty()
  @IsInt()
  @Field((type) => Int, { nullable: false })
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Field((type) => Int, { nullable: false })
  per: number;
}
