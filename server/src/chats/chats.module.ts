import { ImgsModule } from 'src/imgs/imgs.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), forwardRef(() => ImgsModule)],
  providers: [ChatsResolver, ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
