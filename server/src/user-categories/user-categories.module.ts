import { NonRegisteredUsersModule } from 'src/non-registered-users/non-registered-users.module';
import { TrainersModule } from 'src/trainers/trainers.module';
import { UsersModule } from 'src/users/users.module';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserCategory } from './entities/user-category.entity';
import { UserCategoriesResolver } from './user-categories.resolver';
import { UserCategoriesService } from './user-categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCategory]),
    forwardRef(() => TrainersModule),
    forwardRef(() => UsersModule),
    forwardRef(() => NonRegisteredUsersModule),
  ],
  providers: [UserCategoriesResolver, UserCategoriesService],
  exports: [UserCategoriesService],
})
export class UserCategoriesModule {}
