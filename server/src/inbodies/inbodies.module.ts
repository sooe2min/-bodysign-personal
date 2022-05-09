import { UsersModule } from 'src/users/users.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Inbody } from './entities/inbody.entity';
import { InbodiesResolver } from './inbodies.resolver';
import { InbodiesService } from './inbodies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inbody]), forwardRef(() => UsersModule)],
  providers: [InbodiesResolver, InbodiesService],
  exports: [InbodiesService],
})
export class InbodiesModule {}
