import { IsNotEmpty, IsOptional } from 'class-validator';
import SessionStatusTypes from 'src/types/sessionStatus.types';

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  userId: number;

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  trainerId: number;

  @IsNotEmpty()
  @Field({ nullable: false })
  status: SessionStatusTypes;

  /**
   *
   * Non Required Fields
   *
   */

  @IsOptional()
  @Field({ nullable: true })
  feedback?: string;

  @IsOptional()
  @Field({ nullable: true })
  date?: Date;
}
