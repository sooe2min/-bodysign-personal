import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'
import { SessionExerciseVolume } from '../../session-exercise-volumes/entities/session-exercise-volume.entity'
import { Session } from '../../sessions/entities/session.entity'

@Entity({ name: 'sessionExercises' })
@ObjectType()
export class SessionExercise {
	@PrimaryGeneratedColumn()
	@Field(type => Int)
	id: number

	@Column()
	@Field()
	name: string

	@Index()
	@Column()
	@Field(type => Int)
	sessionId: number

	@CreateDateColumn()
	createdAt: Date

	@CreateDateColumn()
	updatedAt: Date

	@Column({ nullable: false })
	@Field({ nullable: false })
	exerciseCategoryName: string

	@ManyToOne(() => Session, session => session.sessionExercises, {
		onDelete: 'CASCADE'
	})
	@Field(type => Session)
	session: Session

	@OneToMany(
		() => SessionExerciseVolume,
		sessionExerciseVolume => sessionExerciseVolume.sessionExercise
	)
	@Field(type => [SessionExerciseVolume], { nullable: 'itemsAndList' })
	sessionExerciseVolumes?: SessionExerciseVolume[]
}
