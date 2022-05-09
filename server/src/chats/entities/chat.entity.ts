import { Field, Int, ObjectType } from '@nestjs/graphql'
import ChatSenderTypes from 'src/types/chatSender.types'
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'
import { Img } from '../../imgs/entities/img.entity'
import { Trainer } from '../../trainers/entities/trainer.entity'
import GeneralStatusTypes from '../../types/generalStatus.types'
import { User } from '../../users/entities/user.entity'

@Entity({ name: 'chats' })
@Index(['userId', 'trainerId'])
@ObjectType()
export class Chat {
	@PrimaryGeneratedColumn()
	@Field(type => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
	id: number

	@Column()
	@Field()
	text: string

	@Index()
	@Column()
	@Field(type => Int)
	userId: number

	@ManyToOne(() => User, user => user.chats)
	@Field(type => User)
	user: User

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

	@CreateDateColumn()
	createdAt: Date

	@CreateDateColumn()
	updatedAt: Date

	@Index()
	@Column('enum', {
		name: 'sender',
		enum: ChatSenderTypes,
		nullable: false
	})
	@Field()
	sender: ChatSenderTypes

	@Column({ type: 'boolean', default: false })
	@Field(type => Boolean, { defaultValue: false })
	seen: boolean

	@ManyToOne(() => Trainer, trainer => trainer.chats)
	@Field(type => Trainer)
	trainer: Trainer

	@OneToMany(() => Img, img => img.chat)
	@Field(type => [Img], { nullable: 'itemsAndList' })
	imgs?: Img[]
}
