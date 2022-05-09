import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { CreateTrainerInput } from './create-trainer.input';
import GeneralStatusTypes from 'src/types/generalStatus.types';

@InputType()
export class UpdateTrainerInput extends PartialType(CreateTrainerInput) {
  /**
   *
   * Required Fields
   *
   */

  @IsNotEmpty()
  @Field(() => Int, { nullable: false })
  id: number;

  /**
   *
   * Non Required Fields
   *
   */

  @IsOptional()
  @Field({ nullable: true })
  birthDate: Date;

  @IsOptional()
  @Field({ nullable: true })
  phoneNumber: string;

  @IsOptional()
  @Field({ nullable: true })
  status: GeneralStatusTypes;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  interests: string[];
}
