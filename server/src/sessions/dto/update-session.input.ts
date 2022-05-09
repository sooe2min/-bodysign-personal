import { IsNotEmpty, IsOptional } from 'class-validator';
import SessionStatusTypes from 'src/types/sessionStatus.types';

import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateSessionInput } from './create-session.input';

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field((type) => Int, { nullable: false })
  id: number;

  /**
   *
   * Non Required Fields
   *
   */

  @IsOptional()
  @Field({ nullable: true })
  status?: SessionStatusTypes;

  @IsOptional()
  @Field({ nullable: true })
  feedback?: string;

  @IsOptional()
  @Field({ nullable: true })
  sentFeedback?: boolean;

  @IsOptional()
  @Field({ nullable: true })
  completedSession?: boolean;

  @IsOptional()
  @Field({ nullable: true })
  date?: Date;
}
