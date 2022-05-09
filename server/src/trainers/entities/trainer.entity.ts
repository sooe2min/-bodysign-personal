import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Chat } from '../../chats/entities/chat.entity';
import { ExerciseCategory } from 'src/exercise-categories/entities/exercise-category.entity';
import GenderTypes from '../../types/gender.types';
import GeneralStatusTypes from '../../types/generalStatus.types';
import { IsEmail } from 'class-validator';
import LoginTypes from 'src/types/login.types';
import { NonRegisteredUser } from 'src/non-registered-users/entities/non-registered-user.entity';
import { RefreshToken } from 'src/refresh-tokens/entities/refreshToken.entity';
import { Session } from '../../sessions/entities/session.entity';
import { SessionHistory } from 'src/session-histories/entities/session-history.entity';
import { TrainerInterest } from 'src/trainer-interest/entities/trainerInterest.entity';
import { User } from '../../users/entities/user.entity';
import { UserCategory } from 'src/user-categories/entities/user-category.entity';

@Entity('trainers')
@ObjectType()
export class Trainer {
  /**
   *
   * Fields
   *
   */

  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: false })
  id: number;

  @IsEmail()
  @Column({ unique: true, nullable: false })
  @Field({ nullable: false })
  email: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  userName: string;

  @Column({ select: false, nullable: true })
  @Field({ nullable: true })
  password: string;

  @CreateDateColumn({ nullable: true })
  @Field({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phoneNumber: string;

  @Column('enum', {
    name: 'gender',
    enum: GenderTypes,
    default: GenderTypes.MALE,
    nullable: false,
  })
  @Field({ nullable: false })
  gender: GenderTypes;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // interest: string;

  @Column('enum', {
    name: 'status',
    enum: GeneralStatusTypes,
    default: GeneralStatusTypes.ACTIVE,
    nullable: false,
  })
  @Field({ nullable: false })
  status: GeneralStatusTypes;

  @Column('enum', {
    name: 'loginType',
    enum: LoginTypes,
    default: LoginTypes.LOCAL,
    nullable: false,
  })
  @Field({ nullable: false })
  loginType: LoginTypes;

  @Column({ nullable: true, select: false })
  @Field({ nullable: true })
  dbPasswordSalt: string;

  @CreateDateColumn({ nullable: false })
  @Field({ nullable: false })
  createdAt: Date;

  @CreateDateColumn({ nullable: false })
  @Field({ nullable: false })
  updatedAt: Date;

  /**
   *
   * Relations
   *
   */

  @OneToMany(() => User, (user) => user.trainer)
  @Field((type) => [User], { nullable: 'itemsAndList' })
  users?: User[];

  @OneToMany(() => Chat, (chat) => chat.trainer)
  @Field((type) => [Chat], { nullable: 'itemsAndList' })
  chats?: Chat[];

  @OneToMany(() => Session, (session) => session.trainer)
  @Field((type) => [Session], { nullable: 'itemsAndList' })
  sessions?: Session[];

  @OneToMany(
    () => ExerciseCategory,
    (exerciseCategory) => exerciseCategory.trainer,
  )
  @Field((type) => [ExerciseCategory], { nullable: 'itemsAndList' })
  exerciseCategories?: ExerciseCategory[];

  @OneToMany(
    () => NonRegisteredUser,
    (nonRegisteredUser) => nonRegisteredUser.trainer,
  )
  @Field((type) => [NonRegisteredUser], { nullable: 'itemsAndList' })
  nonRegisteredUsers?: NonRegisteredUser[];

  @OneToMany(() => UserCategory, (userCategory) => userCategory.trainer)
  @Field((type) => [UserCategory], { nullable: 'itemsAndList' })
  userCategories?: UserCategory[];

  @OneToMany(() => SessionHistory, (sessionHistory) => sessionHistory.user)
  @Field((type) => [SessionHistory])
  sessionHistories?: SessionHistory[];

  @OneToMany(
    () => TrainerInterest,
    (trainerInterest) => trainerInterest.trainer,
  )
  @Field((type) => [TrainerInterest], { nullable: 'itemsAndList' })
  trainerInterests?: TrainerInterest[];

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.trainer)
  refreshToken: RefreshToken;
}
