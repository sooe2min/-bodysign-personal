import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Chat } from '../../chats/entities/chat.entity';

@Entity('imgs')
@Index(['userId', 'trainerId'])
@ObjectType()
export class Img {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: true }) // repository.remove(entityInstance) 시 id가 사라지므로 nullable = true로 설정
  id: number;

  @Column()
  @Field()
  url: string;

  @Index()
  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  chatId: number;

  @Index()
  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  userId: number;

  @Index()
  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  trainerId: number;

  @CreateDateColumn()
  @Field({ nullable: false })
  createdAt: Date;

  @CreateDateColumn()
  @Field({ nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Chat, (chat) => chat.imgs, { onDelete: 'CASCADE' })
  @Field((type) => Chat)
  chat: Chat;
}
