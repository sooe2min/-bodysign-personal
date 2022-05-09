import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Chat } from '../../chats/entities/chat.entity';
import GenderTypes from '../../types/gender.types';
import GeneralStatusTypes from '../../types/generalStatus.types';
import { Inbody } from 'src/inbodies/entities/inbody.entity';
import { IsEmail } from 'class-validator';
import LoginTypes from '../../types/login.types';
import { RefreshToken } from 'src/refresh-tokens/entities/refreshToken.entity';
import { Session } from '../../sessions/entities/session.entity';
import { SessionHistory } from 'src/session-histories/entities/session-history.entity';
import { Trainer } from '../../trainers/entities/trainer.entity';
import { UserCategory } from 'src/user-categories/entities/user-category.entity';

@Entity('users')
@ObjectType()
export class User {
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

  @CreateDateColumn({ nullable: false })
  @Field({ nullable: false })
  birthDate: Date;

  @Column({ nullable: false })
  @Field({ nullable: false })
  phoneNumber: string;

  @Column('enum', {
    name: 'gender',
    enum: GenderTypes,
    default: GenderTypes.MALE,
    nullable: false,
  })
  @Field()
  gender: GenderTypes;

  @Column('boolean', { default: false, nullable: false })
  @Field({ nullable: false })
  graduate: boolean;

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

  @Column({ nullable: true })
  @Index()
  @Field((type) => Int, { nullable: true })
  trainerId: number | null;

  @Column({ nullable: true, select: false })
  @Field({ nullable: true })
  dbPasswordSalt: string;

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  userCategoryId: number | null;

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

  @ManyToOne(() => Trainer, (trainer) => trainer.users)
  @Field((type) => Trainer)
  trainer: Trainer;

  @OneToMany(() => Chat, (chat) => chat.user)
  @Field((type) => [Chat])
  chats?: Chat[];

  @OneToMany(() => Session, (session) => session.user)
  @Field((type) => [Session])
  sessions?: Session[];

  @OneToMany(() => Inbody, (inbody) => inbody.user)
  @Field((type) => [Inbody])
  inbodies?: Inbody[];

  @OneToMany(() => SessionHistory, (sessionHistory) => sessionHistory.user)
  @Field((type) => [SessionHistory])
  sessionHistories?: SessionHistory[];

  @ManyToOne(() => UserCategory, (userCategory) => userCategory.users)
  @Field((type) => UserCategory)
  userCategory?: UserCategory;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken;
}
