import { Module, forwardRef } from '@nestjs/common';

import { ChatsModule } from '../chats/chats.module';
import { Img } from './entities/img.entity';
import { ImgsController } from './imgs.controller';
import { ImgsResolver } from './imgs.resolver';
import { ImgsService } from './imgs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Img]), forwardRef(() => ChatsModule)],
  providers: [ImgsService, ImgsResolver],
  exports: [ImgsService],
  controllers: [ImgsController],
})
export class ImgsModule {}
