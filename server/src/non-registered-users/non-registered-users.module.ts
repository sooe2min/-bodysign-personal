import { TrainersModule } from 'src/trainers/trainers.module';
import { UserCategoriesModule } from 'src/user-categories/user-categories.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NonRegisteredUser } from './entities/non-registered-user.entity';
import { NonRegisteredUsersResolver } from './non-registered-users.resolver';
import { NonRegisteredUsersService } from './non-registered-users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NonRegisteredUser]),
    forwardRef(() => TrainersModule),
    forwardRef(() => UserCategoriesModule),
  ],
  providers: [NonRegisteredUsersResolver, NonRegisteredUsersService],
  exports: [NonRegisteredUsersService],
})
export class NonRegisteredUsersModule {}
