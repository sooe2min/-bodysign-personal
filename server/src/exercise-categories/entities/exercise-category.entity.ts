import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Exercise } from 'src/exercises/entities/exercise.entity'
import { Trainer } from 'src/trainers/entities/trainer.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'exerciseCategories' })
@ObjectType()
export class ExerciseCategory {
	@PrimaryGeneratedColumn()
	@Field(type => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
	id: number

	@Column()
	@Field()
	name: string

	@Index()
	@Column()
	@Field(type => Int)
	trainerId: number

	@CreateDateColumn()
	createdAt: Date

	@CreateDateColumn()
	updatedAt: Date

	@ManyToOne(() => Trainer, trainer => trainer.exerciseCategories)
	@Field(type => Trainer)
	trainer: Trainer

	@OneToMany(() => Exercise, exercise => exercise.exerciseCategory)
	@Field(type => [Exercise], { nullable: 'itemsAndList' })
	exercises?: Exercise[]
}
