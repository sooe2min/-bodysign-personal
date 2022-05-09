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

import { SessionExercise } from '../../session-exercises/entities/session-exercise.entity';
import { Trainer } from '../../trainers/entities/trainer.entity';
import SessionStatusTypes from '../../types/sessionStatus.types';
import { User } from '../../users/entities/user.entity';

@Entity('sessions')
@Index(['userId', 'trainerId'])
@ObjectType()
export class Session {
  /**
   *
   * Fields
   *
   */

  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
  id: number;

  @Index()
  @Column({ nullable: false })
  @Field((type) => Int, { nullable: false })
  userId: number;

  @Index()
  @Column({ nullable: false })
  @Field((type) => Int, { nullable: false })
  trainerId: number;

  @Column('enum', {
    name: 'status',
    enum: SessionStatusTypes,
    default: SessionStatusTypes.ACTIVE,
    nullable: false,
  })
  @Field({ nullable: false })
  status: SessionStatusTypes;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  feedback: string;

  @Column('boolean', { nullable: false, default: false })
  @Field({ nullable: false })
  sentFeedback: boolean;

  @Column('boolean', { nullable: false, default: false })
  @Field({ nullable: false })
  completedSession: boolean;

  @CreateDateColumn()
  @Field({ nullable: false })
  date: Date;

  @CreateDateColumn()
  @Field({ nullable: false })
  createdAt: Date;

  @CreateDateColumn()
  @Field({ nullable: false })
  updatedAt: Date;

  /**
   *
   * Relations
   *
   */

  @ManyToOne(() => User, (user) => user.sessions)
  @Field((type) => User, { nullable: false })
  user: User;

  @ManyToOne(() => Trainer, (trainer) => trainer.sessions)
  @Field((type) => Trainer, { nullable: false })
  trainer: Trainer;

  @OneToMany(
    () => SessionExercise,
    (sessionExercise) => sessionExercise.session,
  )
  @Field((type) => [SessionExercise], { nullable: 'itemsAndList' })
  sessionExercises?: SessionExercise[];
}
