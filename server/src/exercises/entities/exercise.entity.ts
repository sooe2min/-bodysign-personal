import { ExerciseCategory } from 'src/exercise-categories/entities/exercise-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('exercises')
@ObjectType()
export class Exercise {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Field((type) => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
  id: number;

  @Column()
  @Field()
  name: string;

  @Index()
  @Column()
  @Field((type) => Int)
  exerciseCategoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => ExerciseCategory,
    (exerciseCategory) => exerciseCategory.exercises,
    { onDelete: 'CASCADE' },
  )
  @Field((type) => ExerciseCategory)
  exerciseCategory: ExerciseCategory;
}
