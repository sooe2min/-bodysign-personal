import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { SessionExercise } from 'src/session-exercises/entities/session-exercise.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'sessionExerciseVolumes' })
@ObjectType()
export class SessionExerciseVolume {
	/**
	 *
	 * Fields
	 *
	 */

	@PrimaryGeneratedColumn()
	@Field(type => Int)
	id: number

	@Column({ nullable: false })
	@Field(type => Int, { nullable: false })
	reps: number

	@Column({ nullable: false })
	@Field(type => Int, { nullable: false })
	sets: number

	@Column({ nullable: false })
	@Field(type => Float, { nullable: false })
	weight: number

	@Column({ nullable: false, default: 0 })
	@Field(type => Int, { nullable: false })
	seq: number

	@Index()
	@Column({ nullable: false })
	@Field(type => Int, { nullable: false })
	sessionExerciseId: number

	@CreateDateColumn()
	createdAt: Date

	@CreateDateColumn()
	updatedAt: Date

	/**
	 *
	 * Relations
	 *
	 */

	@ManyToOne(
		() => SessionExercise,
		sessionExercise => sessionExercise.sessionExerciseVolumes,
		{
			onDelete: 'CASCADE'
		}
	)
	@Field(type => SessionExercise)
	sessionExercise: SessionExercise
}
