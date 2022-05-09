import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Trainer } from 'src/trainers/entities/trainer.entity'
import GeneralStatusTypes from 'src/types/generalStatus.types'
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'trainerInterests' })
@ObjectType()
export class TrainerInterest {
	/**
	 *
	 * Fields
	 *
	 */

	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	@Field(type => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
	id: number

	@Column({ nullable: false })
	@Field({ nullable: false })
	interest: string

	@Index()
	@Column()
	@Field(type => Int)
	trainerId: number

	@Column('enum', {
		name: 'status',
		enum: GeneralStatusTypes,
		default: GeneralStatusTypes.ACTIVE
	})
	@Field()
	status: GeneralStatusTypes

	@CreateDateColumn({ nullable: false })
	@Field({ nullable: false })
	createdAt: Date

	@CreateDateColumn({ nullable: false })
	@Field({ nullable: false })
	updatedAt: Date

	/**
	 *
	 * Relations
	 *
	 */

	@ManyToOne(() => Trainer, trainer => trainer.trainerInterests)
	@Field(type => Trainer)
	trainer: Trainer
}
