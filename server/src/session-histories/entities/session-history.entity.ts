import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Trainer } from 'src/trainers/entities/trainer.entity'
import GeneralStatusTypes from 'src/types/generalStatus.types'
import { User } from 'src/users/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'sessionHistories' })
@ObjectType()
export class SessionHistory {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	@Field(type => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
	id: number

	@Column('enum', {
		name: 'status',
		enum: GeneralStatusTypes,
		default: GeneralStatusTypes.ACTIVE
	})
	@Field()
	status: GeneralStatusTypes

	@CreateDateColumn()
	@Field()
	date: Date

	@CreateDateColumn()
	createdAt: Date

	@CreateDateColumn()
	updatedAt: Date

	@Column()
	@Field(type => Int)
	costPerSession: number

	@Column()
	@Field(type => Int)
	totalCount: number

	@Column({ default: 0 })
	@Field(type => Int, { defaultValue: 0 })
	usedCount: number

	@Column({ default: 0 })
	@Field(type => Int, { defaultValue: 0 })
	commission: number

	@Index()
	@Column()
	@Field(type => Int)
	userId: number

	@Index()
	@Column()
	@Field(type => Int)
	trainerId: number

	@ManyToOne(() => User, user => user.sessionHistories)
	@Field(type => User)
	user: User

	@ManyToOne(() => Trainer, trainer => trainer.sessionHistories)
	@Field(type => Trainer)
	trainer: Trainer
}
