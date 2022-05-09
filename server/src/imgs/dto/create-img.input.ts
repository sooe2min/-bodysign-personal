import { Field, InputType, Int } from '@nestjs/graphql';

import { IsUrl } from 'class-validator';

@InputType()
export class CreateImgInput {
  @IsUrl()
  @Field()
  url: string;

  @Field((type) => Int, { nullable: true })
  chatId: number;
}
