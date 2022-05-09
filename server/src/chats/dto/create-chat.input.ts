import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
  isArray,
  isNumber,
} from 'class-validator';
import ChatSenderTypes from 'src/types/chatSender.types';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field((type) => Int)
  userId: number;

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  trainerId: number;

  @IsNotEmpty()
  @Field({ nullable: false })
  text: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  sender: ChatSenderTypes;

  /**
   *
   * Non Required Fields
   *
   */
  @IsOptional()
  @IsNumber({}, { each: true })
  @Field((type) => [Int], { nullable: true })
  imgIds?: number[];
}
