import { NonRegisteredUser } from 'src/non-registered-users/entities/non-registered-user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import GeneralStatusTypes from 'src/types/generalStatus.types';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('userCategories')
@ObjectType()
export class UserCategory {
  /**
   *
   * Fields
   *
   */

  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
  id: number;

  @Column('enum', {
    name: 'status',
    enum: GeneralStatusTypes,
    default: GeneralStatusTypes.ACTIVE,
  })
  @Field()
  status: GeneralStatusTypes;

  @Column({ nullable: false })
  @Field({ nullable: false })
  name: string;

  @Index()
  @Column({ nullable: false })
  @Field((type) => Int, { nullable: false })
  trainerId: number;

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

  @ManyToOne(() => Trainer, (trainer) => trainer.userCategories)
  @Field((type) => Trainer, { nullable: false })
  trainer: Trainer;

  @OneToMany(() => User, (user) => user.userCategory)
  @Field((type) => [User], { nullable: 'itemsAndList' })
  users?: User[];

  @OneToMany(
    () => NonRegisteredUser,
    (nonRegisteredUser) => nonRegisteredUser.userCategory,
  )
  @Field((type) => [NonRegisteredUser], { nullable: 'itemsAndList' })
  nonRegisteredUsers?: NonRegisteredUser[];
}
