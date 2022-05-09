import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Trainer } from 'src/trainers/entities/trainer.entity'
import UserType from 'src/types/user.types'
import { User } from 'src/users/entities/user.entity'
import {
	Column,
	Entity,
	Index,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'refreshTokens' })
@ObjectType()
export class RefreshToken {
	/**
	 *
	 * Fields
	 *
	 */

	@PrimaryGeneratedColumn()
	@Field(type => Int)
	id: number

	@Column('enum', {
		enum: UserType,
		nullable: false
	})
	@Field({ nullable: false })
	targetType: UserType

	@Column({ nullable: false })
	@Field(type => Int)
	targetId: number

	@Index()
	@Column({ nullable: false })
	@Field({ nullable: false })
	refreshToken: string

	// nullable when local user/trainer
	@Column('varchar', { nullable: true })
	@Field(type => Int, { nullable: true })
	providerId: string

	/**
	 *
	 * Relations
	 *
	 */

	@OneToOne(() => User, user => user.refreshToken)
	user?: User

	@OneToOne(() => Trainer, trainer => trainer.refreshToken)
	trainer?: Trainer
}
