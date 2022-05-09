import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NonRegisteredUsersService } from './non-registered-users.service';
import { NonRegisteredUser } from './entities/non-registered-user.entity';
import { CreateNonRegisteredUserInput } from './dto/create-non-registered-user.input';
import { UpdateNonRegisteredUserInput } from './dto/update-non-registered-user.input';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { UserCategory } from 'src/user-categories/entities/user-category.entity';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => NonRegisteredUser)
@UseGuards(JwtAuthGuard)
export class NonRegisteredUsersResolver {
  constructor(
    private readonly nonRegisteredUsersService: NonRegisteredUsersService,
  ) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [NonRegisteredUser], { name: 'nonRegisteredUsers' })
  findAll(): Promise<NonRegisteredUser[]> {
    return this.nonRegisteredUsersService.findAll();
  }

  @Query(() => NonRegisteredUser, { name: 'nonRegisteredUser' })
  findOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<NonRegisteredUser> {
    return this.nonRegisteredUsersService.findOneById(id);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => NonRegisteredUser)
  createNonRegisteredUser(
    @Args('createNonRegisteredUserInput')
    createNonRegisteredUserInput: CreateNonRegisteredUserInput,
  ): Promise<NonRegisteredUser> {
    return this.nonRegisteredUsersService.create(createNonRegisteredUserInput);
  }

  @Mutation(() => NonRegisteredUser)
  async updateNonRegisteredUser(
    @Args('updateNonRegisteredUserInput')
    updateNonRegisteredUserInput: UpdateNonRegisteredUserInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<NonRegisteredUser> {
    const canMutate = await this.nonRegisteredUsersService.canMutate(
      currentUser,
      updateNonRegisteredUserInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.nonRegisteredUsersService.update(updateNonRegisteredUserInput);
  }

  @Mutation(() => NonRegisteredUser)
  async removeNonRegisteredUser(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ) {
    const canMutate = await this.nonRegisteredUsersService.canMutate(
      currentUser,
      id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.nonRegisteredUsersService.remove(id);
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField((returns) => Trainer)
  trainer(@Parent() nonRegisteredUser: NonRegisteredUser): Promise<Trainer> {
    const { trainerId } = nonRegisteredUser;
    return this.nonRegisteredUsersService.getTrainer(trainerId);
  }

  @ResolveField((returns) => UserCategory)
  userCategory(
    @Parent() nonRegisteredUser: NonRegisteredUser,
  ): Promise<UserCategory> {
    const { userCategoryId } = nonRegisteredUser;
    return this.nonRegisteredUsersService.getUserCategory(userCategoryId);
  }
}
