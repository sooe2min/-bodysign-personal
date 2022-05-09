import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Trainer } from 'src/trainers/entities/trainer.entity'
import GenderTypes from 'src/types/gender.types'
import GeneralStatusTypes from 'src/types/generalStatus.types'
import { UserCategory } from 'src/user-categories/entities/user-category.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'nonRegisteredUsers' })
@ObjectType()
export class NonRegisteredUser {
	/**
	 *
	 * Fields
	 *
	 */

	@PrimaryGeneratedColumn({ type: 'int' })
	@Field(type => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
	id: number

	@Column({ nullable: false })
	@Field({ nullable: false })
	userName: string

	@Column({ nullable: false })
	@Field({ nullable: false })
	phoneNumber: string

	@Column('boolean', { nullable: false, default: false })
	@Field({ nullable: false })
	graduate: boolean

	@Column('enum', {
		name: 'gender',
		enum: GenderTypes,
		default: GenderTypes.MALE,
		nullable: false
	})
	@Field()
	gender: GenderTypes

	@Column('enum', {
		name: 'status',
		enum: GeneralStatusTypes,
		default: GeneralStatusTypes.ACTIVE,
		nullable: false
	})
	@Field()
	status: GeneralStatusTypes

	@Index()
	@Column({ nullable: false })
	@Field(type => Int, { nullable: false })
	trainerId: number

	@Column({ nullable: false })
	@Field(type => Int, { nullable: false })
	userCategoryId: number

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

	@ManyToOne(() => Trainer, trainer => trainer.nonRegisteredUsers)
	@Field(type => Trainer)
	trainer: Trainer

	@ManyToOne(
		() => UserCategory,
		userCategory => userCategory.nonRegisteredUsers
	)
	@Field(type => UserCategory)
	userCategory: UserCategory
}
