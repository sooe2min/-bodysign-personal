import GeneralStatusTypes from 'src/types/generalStatus.types';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Entity('inbodies')
@ObjectType()
export class Inbody {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Field((type) => Int)
  id: number;

  @Column({ name: 'bodyWeight', type: 'float', default: 0.0 })
  @Field((type) => Float)
  bodyWeight: number;

  @Column({ name: 'muscleWeight', type: 'float', default: 0.0 })
  @Field((type) => Float)
  muscleWeight: number;

  @Column({ name: 'bodyFat', type: 'float', default: 0.0 })
  @Field((type) => Float)
  bodyFat: number;

  @Column('enum', {
    name: 'status',
    enum: GeneralStatusTypes,
    default: GeneralStatusTypes.ACTIVE,
  })
  @Field()
  status: GeneralStatusTypes;

  @CreateDateColumn()
  @Field()
  measuredDate: Date;

  @Index()
  @Column()
  @Field((type) => Int)
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.inbodies)
  @Field((type) => User)
  user: User;
}
